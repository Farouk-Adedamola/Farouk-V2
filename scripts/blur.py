"""Regenerate src/data/blur.ts from the images in public/images.

    python3 scripts/blur.py

Needs Pillow (`pip3 install --user Pillow`). Run it after adding or replacing
any image referenced from src/data/*.ts.
"""
import base64
import glob
import io
import os

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WIDTH = 16  # enough to read as a colour field once CSS blurs it

entries = []
for path in sorted(glob.glob(os.path.join(ROOT, 'public/images/*'))):
    if not path.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
        continue
    key = '/' + os.path.relpath(path, os.path.join(ROOT, 'public'))
    im = Image.open(path).convert('RGB')
    height = max(1, round(im.height * WIDTH / im.width))
    buf = io.BytesIO()
    im.resize((WIDTH, height), Image.LANCZOS).save(
        buf, format='JPEG', quality=42, optimize=True
    )
    b64 = base64.b64encode(buf.getvalue()).decode()
    entries.append((key, f'data:image/jpeg;base64,{b64}'))
    print(f'{key:30} {im.width}x{im.height} -> {WIDTH}x{height}')

body = '\n'.join(f"  '{k}':\n    '{v}'," for k, v in entries)
out = f"""/**
 * Tiny base64 JPEGs (16px wide) used as blur-up placeholders, so an image
 * area is never an empty box while the real file loads. Regenerate with
 * scripts/blur.py after adding or replacing anything in /public/images.
 */
export const blurMap: Record<string, string> = {{
{body}
}};

export const blurFor = (src?: string): string | undefined =>
  src ? blurMap[src] : undefined;
"""
with open(os.path.join(ROOT, 'src/data/blur.ts'), 'w') as f:
    f.write(out)
print(f'\nwrote src/data/blur.ts ({len(entries)} images)')
