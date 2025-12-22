import React, { useState, useEffect } from "react";
import AdminLayout from "./layouts/AdminLayout";
import BoardView from "./pages/BoardView";
import LoginPage from "./pages/LoginPage";
import GlobalSearchModal from "./components/shared/GlobalSearchModal";
import {
    NavigationState,
    User,
    ContentPost,
    MediaFile,
    ExhibitionItem,
    Task,
} from "./types";
import { ThemeProvider } from "./contexts/ThemeContext";
import { DB } from "./db";
import "./main.css";

const AppContent: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentUser, setCurrentUser] = useState<User>(
        DB.currentUser as User
    );
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activePage, setActivePage] = useState<NavigationState>({
        type: "dashboard",
        title: "Dashboard",
    });
    const [projectIconMap, setProjectIconMap] = useState<
        Record<string, { name: string; color?: string }>
    >({
        "it-website": { name: "Layout", color: "#000000" },
        "it-mobile": { name: "Cpu", color: "#000000" },
        "marketing-content": { name: "Megaphone", color: "#000000" },
    });

    const [allTasks, setAllTasks] = useState<Task[]>(DB.initialTasks as Task[]);
    const [cmsPosts, setCmsPosts] = useState<ContentPost[]>(
        DB.initialCmsPosts as ContentPost[]
    );
    const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(
        DB.initialMedia as MediaFile[]
    );
    const [exhibitionItems, setExhibitionItems] = useState<ExhibitionItem[]>(
        DB.initialExhibition as ExhibitionItem[]
    );
    const [teamUsers, setTeamUsers] = useState<User[]>(
        DB.initialUsers as User[]
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    if (!isLoggedIn) return <LoginPage onLogin={() => setIsLoggedIn(true)} />;

    return (
        <>
            <AdminLayout
                activePage={activePage}
                onNavigate={setActivePage}
                onLogout={() => setIsLoggedIn(false)}
                onSearchClick={() => setIsSearchOpen(true)}
                projectIcons={projectIconMap}>
                <BoardView
                    {...activePage}
                    key={activePage.id || activePage.type}
                    projectId={activePage.id}
                    projectIcon={
                        activePage.id
                            ? projectIconMap[activePage.id]?.name
                            : undefined
                    }
                    projectColor={
                        activePage.id
                            ? projectIconMap[activePage.id]?.color
                            : undefined
                    }
                    onProjectIconChange={
                        activePage.id
                            ? (icon, color) =>
                                  setProjectIconMap((prev) => ({
                                      ...prev,
                                      [activePage.id!]: { name: icon, color },
                                  }))
                            : undefined
                    }
                    currentUser={currentUser}
                    onLogout={() => setIsLoggedIn(false)}
                    tasks={
                        activePage.id
                            ? allTasks.filter(
                                  (t) => t.projectId === activePage.id
                              )
                            : allTasks
                    }
                    onUpdateTask={(id, up) =>
                        setAllTasks((prev) =>
                            prev.map((t) => (t.id === id ? { ...t, ...up } : t))
                        )
                    }
                    onDeleteTask={(id) =>
                        setAllTasks((prev) => prev.filter((t) => t.id !== id))
                    }
                    onAddTask={() =>
                        setAllTasks([
                            {
                                id: Math.random().toString(),
                                projectId: activePage.id || "it-website",
                                name: "Yangi Vazifa",
                                status: "Boshlanmadi",
                                deadline: "2025-05-30",
                                assignees: [],
                                icon: "File",
                            },
                            ...allTasks,
                        ])
                    }
                    cmsPosts={cmsPosts}
                    onUpdateCmsPost={(p) =>
                        setCmsPosts((prev) =>
                            prev.find((x) => x.id === p.id)
                                ? prev.map((x) => (x.id === p.id ? p : x))
                                : [p, ...prev]
                        )
                    }
                    onDeleteCmsPost={(id) =>
                        setCmsPosts((p) => p.filter((x) => x.id !== id))
                    }
                    mediaFiles={mediaFiles}
                    onUploadMedia={(f) => setMediaFiles((prev) => [f, ...prev])}
                    exhibitionItems={exhibitionItems}
                    onUpdateExhibition={(i) =>
                        setExhibitionItems((prev) =>
                            prev.map((x) => (x.id === i.id ? i : x))
                        )
                    }
                    onNavigate={setActivePage}
                    teamUsers={teamUsers}
                    onUpdateUser={(id, up) =>
                        setTeamUsers((prev) =>
                            prev.map((u) => (u.id === id ? { ...u, ...up } : u))
                        )
                    }
                    activePagePayload={activePage.payload}
                />
            </AdminLayout>
            <GlobalSearchModal
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
                onNavigate={setActivePage}
            />
        </>
    );
};

const AdminApp: React.FC = () => (
    <ThemeProvider>
        <AppContent />
    </ThemeProvider>
);
export default AdminApp;
