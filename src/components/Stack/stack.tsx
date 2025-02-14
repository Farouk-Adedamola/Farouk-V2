import React from 'react';

import { motion } from 'framer-motion';
import { Clock, Calendar, Activity, Code } from 'lucide-react';

import Text from '../Text/text';
import { WakatimeData } from '../hero/hero';

interface WakatimeHoursData {
  data: {
    best_day: {
      date: string;
      text: string;
    };
    grand_total: {
      daily_average: number;
      human_readable_total: string;
      human_readable_daily_average: string;
    };
  };
}

interface StackProps {
  data: WakatimeData[];
  code_hours: WakatimeHoursData | any;
}

const Stack: React.FC<StackProps> = ({ data, code_hours }) => {
  return (
    <div className="relative rounded-lg border border-gray-800/50 bg-gray-900/30 p-8 backdrop-blur-sm">
      <div className="mb-8 flex items-center justify-between">
        <Text className="text-sm font-medium text-emerald-light/80">
          Coding Activity
        </Text>
        <Text className="text-xs text-gray-500">via wakatime</Text>
      </div>

      {code_hours && (
        <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2 rounded-lg border border-gray-800/50 bg-gray-900/50 p-4"
          >
            <div className="flex items-center gap-2 text-emerald-light">
              <Clock size={16} />
              <Text className="text-xs uppercase">Total Time</Text>
            </div>
            <Text className="text-[14px] font-semibold text-gray-200 lg:text-lg">
              {code_hours.grand_total?.human_readable_total}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-2 rounded-lg border border-gray-800/50 bg-gray-900/50 p-4"
          >
            <div className="flex items-center gap-2 text-emerald-light">
              <Activity size={16} />
              <Text className="text-xs uppercase">Daily Average</Text>
            </div>
            <Text className="text-[14px] font-semibold text-gray-200 lg:text-lg">
              {code_hours.grand_total?.human_readable_daily_average}
            </Text>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-2 rounded-lg border border-gray-800/50 bg-gray-900/50 p-4"
          >
            <div className="flex items-center gap-2 text-emerald-light">
              <Calendar size={16} />
              <Text className="text-xs uppercase">Best Day</Text>
            </div>
            <Text className="text-[14px] font-semibold text-gray-200 lg:text-lg">
              {code_hours.best_day?.text}
            </Text>
            <Text className="text-xs text-gray-500">
              {code_hours.best_day?.date}
            </Text>
          </motion.div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-emerald-light">
          <Code size={16} />
          <Text className="text-xs uppercase">Languages</Text>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {data.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group relative overflow-hidden rounded-md border border-gray-800/50 bg-gray-900/50 p-3 transition-all hover:border-emerald-500/30 hover:shadow-lg"
            >
              <div
                className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-10"
                style={{ backgroundColor: tech.color }}
              />
              <div className="flex flex-col gap-1">
                <Text className="text-sm font-medium text-gray-300 transition-colors group-hover:text-emerald-light">
                  {tech.name}
                </Text>
                <Text className="text-xs text-gray-500">
                  {tech.percent?.toFixed(1)}%
                </Text>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stack;
