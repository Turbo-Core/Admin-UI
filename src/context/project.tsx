import React from "react";
import { useQueryState } from "@/hooks/useQueryState";

export interface Project {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectContextInterface {
    query: {
        projectId?: string;
    };
    getProject: () => void;
    setProject: (project: Project) => void;
}

export const projectContextDefaults: ProjectContextInterface = {
    query: { projectId: undefined },
    getProject: () => {},
    setProject: () => {},
};

export const ProjectContext = React.createContext<ProjectContextInterface>(
    projectContextDefaults
);

export const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
    const [query, setQuery] = useQueryState();

    const getProject = (): Project => {
        // Fetch project from API
        return {
            id: "1",
            name: "Project 1",
            createdAt: "2021-01-01",
            updatedAt: "2021-01-01"
        }
    };

    const setProject = (project: Project) => {
        setQuery({ projectId: project.id });
    };

    return (
        <ProjectContext.Provider value={{ query, getProject, setProject }}>
            {children}
        </ProjectContext.Provider>
    );
};
