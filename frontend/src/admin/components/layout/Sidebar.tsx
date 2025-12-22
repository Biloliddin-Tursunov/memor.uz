import React, { useState } from "react";
import {
    Search,
    Home,
    User,
    ChevronDown,
    ChevronRight,
    Users,
    Megaphone,
    Pen,
    Camera,
    Plus,
    Inbox,
    Database,
    Edit2,
    Check,
    X,
    Layout,
    Code,
    Image as ImageIcon,
    Wallet,
} from "lucide-react";
import { NavigationState } from "../../types";
import { useTheme } from "../../contexts/ThemeContext";
import SmartIcon from "../ui/SmartIcon";

interface SidebarProps {
    activePage: NavigationState;
    onNavigate: (page: NavigationState) => void;
    onLogout: () => void;
    onSearchClick: () => void;
    onCloseMobile?: () => void;
    projectIcons?: Record<string, { name: string; color?: string }>;
}

interface TeamData {
    id: string;
    label: string;
    iconKey: string;
    isOpen: boolean;
    projects: { id: string; label: string; icon: string }[];
}

const INITIAL_TEAMS: TeamData[] = [
    {
        id: "it",
        label: "IT Dept",
        iconKey: "Code",
        isOpen: true,
        projects: [
            { id: "it-website", label: "Web Redesign", icon: "Layout" },
            { id: "it-mobile", label: "Mobile App v2", icon: "Cpu" },
        ],
    },
    {
        id: "marketing",
        label: "Marketing",
        iconKey: "Megaphone",
        isOpen: true,
        projects: [
            { id: "marketing-content", label: "SMM Plan", icon: "Megaphone" },
        ],
    },
];

const Sidebar: React.FC<SidebarProps> = ({
    activePage,
    onNavigate,
    onLogout,
    onSearchClick,
    projectIcons,
}) => {
    const { t } = useTheme();
    const [cmsOpen, setCmsOpen] = useState(true);
    const [teams, setTeams] = useState<TeamData[]>(INITIAL_TEAMS);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const [addModal, setAddModal] = useState<{
        isOpen: boolean;
        type: "Team" | "Project";
        parentId?: string;
    }>({
        isOpen: false,
        type: "Team",
    });
    const [newItemName, setNewItemName] = useState("");

    const toggleTeam = (teamId: string) => {
        setTeams(
            teams.map((t) =>
                t.id === teamId ? { ...t, isOpen: !t.isOpen } : t
            )
        );
    };

    const startEditing = (id: string, currentLabel: string) => {
        setEditingId(id);
        setEditValue(currentLabel);
    };

    const saveEditing = () => {
        if (!editingId) return;
        const teamIndex = teams.findIndex((t) => t.id === editingId);
        if (teamIndex !== -1) {
            const newTeams = [...teams];
            newTeams[teamIndex].label = editValue;
            setTeams(newTeams);
        } else {
            const newTeams = teams.map((t) => ({
                ...t,
                projects: t.projects.map((p) => {
                    if (p.id === editingId) {
                        return { ...p, label: editValue };
                    }
                    return p;
                }),
            }));
            setTeams(newTeams);
        }
        setEditingId(null);
    };

    const handleAddItem = () => {
        if (!newItemName) return;
        if (addModal.type === "Team") {
            const newTeam: TeamData = {
                id: Math.random().toString(),
                label: newItemName,
                iconKey: "Users",
                isOpen: true,
                projects: [],
            };
            setTeams([...teams, newTeam]);
        } else if (addModal.type === "Project" && addModal.parentId) {
            setTeams(
                teams.map((t) => {
                    if (t.id === addModal.parentId) {
                        return {
                            ...t,
                            projects: [
                                ...t.projects,
                                {
                                    id: Math.random().toString(),
                                    label: newItemName,
                                    icon: "File",
                                },
                            ],
                        };
                    }
                    return t;
                })
            );
        }
        setAddModal({ isOpen: false, type: "Team" });
        setNewItemName("");
    };

    return (
        <div className="flex flex-col h-full bg-bgSidebar backdrop-blur-2xl border-r border-borderDark text-textMain select-none transition-colors duration-300">
            <div className="h-32 flex flex-col items-center justify-center px-4 border-b border-borderDark shrink-0 relative bg-white/10">
                <div className="flex items-center gap-3">
                    <div className="hidden md:block w-8 h-px bg-textMain opacity-30"></div>
                    <h1 className="font-caslon text-4xl text-textMain tracking-widest uppercase">
                        ME'MOR
                    </h1>
                    <div className="hidden md:block w-8 h-px bg-textMain opacity-30"></div>
                </div>
                <div className="mt-2 flex items-center gap-4 text-[10px] font-sans font-bold text-accent uppercase tracking-[0.2em]">
                    <span>Admin Panel</span>
                    <div className="w-1 h-1 rounded-full bg-accent animate-pulse"></div>
                    <span>v2.0</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-8">
                <div className="space-y-1">
                    <div className="px-3 mb-2 text-[10px] font-bold text-textMuted uppercase tracking-widest font-sans opacity-70">
                        Asosiy
                    </div>
                    <NavItem
                        icon={<Home size={18} />}
                        label={t("dashboard")}
                        active={activePage.type === "dashboard"}
                        onClick={() =>
                            onNavigate({
                                type: "dashboard",
                                title: t("dashboard"),
                            })
                        }
                    />
                    <NavItem
                        icon={<Inbox size={18} />}
                        label={t("inbox")}
                        active={activePage.type === "inbox"}
                        onClick={() =>
                            onNavigate({ type: "inbox", title: t("inbox") })
                        }
                        badge="4"
                    />
                    <NavItem
                        icon={<Wallet size={18} />}
                        label="Moliya"
                        active={activePage.type === "finance"}
                        onClick={() =>
                            onNavigate({ type: "finance", title: "Finance" })
                        }
                    />
                    <NavItem
                        icon={<ImageIcon size={18} />}
                        label={t("exhibition")}
                        active={activePage.type === "exhibition"}
                        onClick={() =>
                            onNavigate({
                                type: "exhibition",
                                title: t("exhibition"),
                            })
                        }
                    />
                    <NavItem
                        icon={<Search size={18} />}
                        label={t("search")}
                        active={false}
                        onClick={onSearchClick}
                        shortcut="⌘K"
                    />
                </div>

                <div>
                    <div
                        className="flex items-center justify-between px-3 mb-2 group cursor-pointer"
                        onClick={() => setCmsOpen(!cmsOpen)}>
                        <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest font-sans group-hover:text-accent transition-colors opacity-70">
                            {t("cms_system")}
                        </span>
                        <ChevronDown
                            size={14}
                            className={`text-textMuted transition-transform ${
                                cmsOpen ? "" : "-rotate-90"
                            }`}
                        />
                    </div>

                    {cmsOpen && (
                        <div className="space-y-1 animate-slideDown relative">
                            <div className="absolute left-4 top-0 bottom-0 w-px bg-borderDark/50"></div>
                            <NavItem
                                icon={<Pen size={18} />}
                                label={t("content_studio")}
                                active={activePage.type === "cms-studio"}
                                onClick={() =>
                                    onNavigate({
                                        type: "cms-studio",
                                        title: t("content_studio"),
                                    })
                                }
                                className="pl-8"
                            />
                            <NavItem
                                icon={<Database size={18} />}
                                label={t("all_content")}
                                active={activePage.type === "cms-content"}
                                onClick={() =>
                                    onNavigate({
                                        type: "cms-content",
                                        title: t("all_content"),
                                    })
                                }
                                className="pl-8"
                            />
                            <NavItem
                                icon={<Camera size={18} />}
                                label={t("media_library")}
                                active={activePage.type === "cms-media"}
                                onClick={() =>
                                    onNavigate({
                                        type: "cms-media",
                                        title: t("media_library"),
                                    })
                                }
                                className="pl-8"
                            />
                        </div>
                    )}
                </div>

                <div>
                    <div className="flex items-center justify-between px-3 mb-2 group">
                        <span className="text-[10px] font-bold text-textMuted uppercase tracking-widest font-sans group-hover:text-accent transition-colors opacity-70">
                            {t("workspace")}
                        </span>
                        <button
                            onClick={() =>
                                setAddModal({ isOpen: true, type: "Team" })
                            }
                            className="text-textMuted hover:text-accent opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Jamoa qo'shish">
                            <Plus size={14} />
                        </button>
                    </div>

                    <div className="space-y-2">
                        {teams.map((team) => (
                            <div key={team.id} className="relative">
                                <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer text-textMuted hover:text-textMain group transition-colors">
                                    {editingId === team.id ? (
                                        <div className="flex items-center gap-2 w-full animate-fadeIn">
                                            <input
                                                autoFocus
                                                className="flex-1 bg-white dark:bg-cardBg border-b border-accent text-sm text-textMain px-1 outline-none font-serif"
                                                value={editValue}
                                                onChange={(e) =>
                                                    setEditValue(e.target.value)
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                onKeyDown={(e) =>
                                                    e.key === "Enter" &&
                                                    saveEditing()
                                                }
                                            />
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    saveEditing();
                                                }}
                                                className="text-accent hover:scale-110">
                                                <Check size={14} />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setEditingId(null);
                                                }}
                                                className="text-red-400 hover:scale-110">
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <div
                                                className="flex items-center gap-3 overflow-hidden flex-1"
                                                onClick={() =>
                                                    toggleTeam(team.id)
                                                }>
                                                <ChevronRight
                                                    size={14}
                                                    className={`transition-transform shrink-0 ${
                                                        team.isOpen
                                                            ? "rotate-90"
                                                            : ""
                                                    }`}
                                                />
                                                <span className="text-sm font-semibold font-serif leading-tight">
                                                    {team.label}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        startEditing(
                                                            team.id,
                                                            team.label
                                                        );
                                                    }}
                                                    className="text-textMuted hover:text-accent">
                                                    <Edit2 size={12} />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setAddModal({
                                                            isOpen: true,
                                                            type: "Project",
                                                            parentId: team.id,
                                                        });
                                                    }}
                                                    className="text-textMuted hover:text-accent">
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {team.isOpen && (
                                    <div className="pl-4 space-y-1 mt-1 border-l border-borderDark ml-4">
                                        {team.projects.map((proj) => {
                                            const currentIconData =
                                                projectIcons?.[proj.id];
                                            const iconName =
                                                currentIconData?.name ||
                                                proj.icon;
                                            const iconColor =
                                                currentIconData?.color;

                                            return (
                                                <div
                                                    key={proj.id}
                                                    className="relative group/proj">
                                                    {editingId === proj.id ? (
                                                        <div className="flex items-center gap-2 p-1 bg-white dark:bg-cardBg rounded border border-borderDark relative">
                                                            <input
                                                                autoFocus
                                                                className="flex-1 bg-transparent border-b border-accent text-sm text-textMain px-1 outline-none font-serif"
                                                                value={
                                                                    editValue
                                                                }
                                                                onChange={(e) =>
                                                                    setEditValue(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                onClick={(e) =>
                                                                    e.stopPropagation()
                                                                }
                                                                onKeyDown={(
                                                                    e
                                                                ) =>
                                                                    e.key ===
                                                                        "Enter" &&
                                                                    saveEditing()
                                                                }
                                                            />
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    saveEditing();
                                                                }}
                                                                className="text-accent">
                                                                <Check
                                                                    size={14}
                                                                />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between pr-2">
                                                            <NavItem
                                                                icon={
                                                                    <SmartIcon
                                                                        name={
                                                                            iconName
                                                                        }
                                                                        size={
                                                                            18
                                                                        }
                                                                        color={
                                                                            iconColor
                                                                        }
                                                                        className={
                                                                            !iconColor
                                                                                ? "text-accent/60 group-hover/proj:text-accent transition-all"
                                                                                : "transition-all"
                                                                        }
                                                                    />
                                                                }
                                                                label={
                                                                    proj.label
                                                                }
                                                                active={
                                                                    activePage.id ===
                                                                    proj.id
                                                                }
                                                                onClick={() =>
                                                                    onNavigate({
                                                                        type: "project",
                                                                        id: proj.id,
                                                                        title: proj.label,
                                                                    })
                                                                }
                                                                className="py-1.5 text-sm"
                                                            />
                                                            <button
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.stopPropagation();
                                                                    startEditing(
                                                                        proj.id,
                                                                        proj.label
                                                                    );
                                                                }}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 text-textMuted hover:text-accent opacity-0 group-hover/proj:opacity-100 transition-opacity">
                                                                <Edit2
                                                                    size={12}
                                                                />
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-borderDark space-y-1 bg-white/30 backdrop-blur-md">
                <NavItem
                    icon={<Users size={18} />}
                    label={t("team")}
                    active={activePage.type === "team-directory"}
                    onClick={() =>
                        onNavigate({ type: "team-directory", title: t("team") })
                    }
                />
                <NavItem
                    icon={<User size={18} />}
                    label={t("profile")}
                    active={activePage.type === "profile"}
                    onClick={() =>
                        onNavigate({ type: "profile", title: t("profile") })
                    }
                />
            </div>

            {addModal.isOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                    onClick={() => setAddModal({ ...addModal, isOpen: false })}>
                    <div
                        className="bg-bgMain border border-borderDark p-8 shadow-[0_20px_60px_rgba(0,0,0,0.3)] animate-slideDown w-80 relative rounded-2xl"
                        onClick={(e) => e.stopPropagation()}>
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-accent rounded-t-2xl"></div>
                        <h3 className="font-caslon text-xl text-textMain mb-4 uppercase tracking-widest font-bold">
                            {t("create_new")}
                        </h3>
                        <input
                            autoFocus
                            className="w-full bg-white dark:bg-cardBg border border-borderDark p-3.5 text-textMain outline-none focus:border-accent mb-6 transition-colors font-sans rounded-xl shadow-inner"
                            placeholder={`Nomini yozing...`}
                            value={newItemName}
                            onChange={(e) => setNewItemName(e.target.value)}
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleAddItem()
                            }
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() =>
                                    setAddModal({ ...addModal, isOpen: false })
                                }
                                className="px-4 py-2 text-textMuted hover:text-textMain text-xs transition-colors font-bold uppercase tracking-widest">
                                Cancel
                            </button>
                            <button
                                onClick={handleAddItem}
                                className="px-6 py-2 bg-accent text-white text-[10px] font-black uppercase tracking-widest hover:bg-accentHover transition-all shadow-lg active:scale-95 rounded-lg">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const NavItem: React.FC<{
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
    badge?: string;
    shortcut?: string;
    className?: string;
}> = ({ icon, label, active, onClick, badge, shortcut, className }) => (
    <button
        onClick={onClick}
        className={`
         w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative
         ${
             active
                 ? "bg-white dark:bg-white/10 text-accent font-bold shadow-sm ring-1 ring-black/5"
                 : "text-textMuted hover:text-textMain hover:bg-black/5 dark:hover:bg-white/5"
         }
         ${className}
      `}>
        <div
            className={`transition-transform duration-300 flex items-center justify-center shrink-0 ${
                active ? "scale-110 text-accent" : "group-hover:scale-105"
            }`}>
            {icon}
        </div>
        <span className="flex-1 text-left font-sans text-sm leading-tight">
            {label}
        </span>

        {badge && (
            <span
                className={`text-[9px] font-black px-1.5 py-0.5 rounded-full border ${
                    active
                        ? "bg-accent text-white border-accent"
                        : "bg-white/50 border-borderDark text-textMuted"
                }`}>
                {badge}
            </span>
        )}
    </button>
);

export default Sidebar;
