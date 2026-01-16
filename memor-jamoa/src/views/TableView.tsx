
import React from 'react';
import { Task } from '../types';
import { Edit2, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../context/TaskContext';
import { useLanguage } from '../context/LanguageContext';

interface TableViewProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
}

const TableView: React.FC<TableViewProps> = ({ tasks, onEditTask }) => {
    const { isAdmin } = useAuth();
    const { deleteTask } = useTasks();
    const { t } = useLanguage();
    
    const handleDelete = (id: string) => {
        if(window.confirm(t('Archive this artifact?'))) {
            deleteTask(id);
        }
    }

  return (
    <div className="bg-parchment rounded-sm shadow-paper overflow-hidden border border-parchment-dark">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-parchment-dark/30 text-parchment-dim text-xs uppercase tracking-wider font-serif">
              <th className="p-4 border-b border-parchment-dark/40">{t("Task")}</th>
              <th className="p-4 border-b border-parchment-dark/40">{t("Type")}</th>
              <th className="p-4 border-b border-parchment-dark/40">{t("Status")}</th>
              <th className="p-4 border-b border-parchment-dark/40">{t("Deadline")}</th>
              <th className="p-4 border-b border-parchment-dark/40 text-right">{t("Actions")}</th>
            </tr>
          </thead>
          <tbody className="text-parchment-text text-sm">
            {tasks.map((task, idx) => (
              <tr 
                key={task.id} 
                className={`
                    border-b border-parchment-dark/20 hover:bg-parchment-dark/10 transition-colors
                    ${idx % 2 === 0 ? 'bg-parchment/50' : 'bg-parchment'}
                `}
              >
                <td className="p-4">
                    <div className="font-bold font-serif text-lg">{t(task.title)}</div>
                    <div className="text-xs text-parchment-dim truncate max-w-xs">{t(task.description)}</div>
                </td>
                <td className="p-4">
                    <span className={`
                        px-2 py-1 rounded-sm text-[10px] uppercase font-bold border
                        ${task.type.toLowerCase().includes('muhim') ? 'border-red-800/30 text-red-900 bg-red-100' : 
                          task.type.toLowerCase().includes('loyiha') ? 'border-blue-800/30 text-blue-900 bg-blue-100' : 'border-gray-600 text-gray-800 bg-gray-100'}
                    `}>
                        {t(task.type)}
                    </span>
                </td>
                <td className="p-4 font-mono text-xs">{t(task.status)}</td>
                <td className="p-4 font-mono text-xs">{task.deadline}</td>
                <td className="p-4 text-right">
                    <div className="flex justify-end items-center gap-3">
                        {task.resourceLink && (
                             <a href={task.resourceLink} target="_blank" rel="noreferrer" className="text-parchment-dim hover:text-black">
                                <ExternalLink size={16} />
                             </a>
                        )}
                        {isAdmin && (
                            <>
                                <button onClick={() => onEditTask(task)} className="text-parchment-dim hover:text-black">
                                    <Edit2 size={16} />
                                </button>
                                <button onClick={() => handleDelete(task.id)} className="text-red-800 hover:text-red-600 font-bold px-2">
                                    X
                                </button>
                            </>
                        )}
                    </div>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
                <tr>
                    <td colSpan={5} className="p-8 text-center text-parchment-dim italic">{t("No records found in the archives.")}</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableView;
