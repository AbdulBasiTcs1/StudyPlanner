// AppContext.js — Global state for user, tasks, subjects
import React, { createContext, useContext, useState } from 'react';
import { SUBJECTS } from './theme';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Abdul Basit',
    reg: 'SP24-BCS-033',
    email: 'sp24-bcs-033@cuiatk.edu.pk',
    sem: 'Semester 5',
  });

  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState(SUBJECTS);

  const addTask = (task) => setTasks((prev) => [...prev, { ...task, done: false }]);

  const toggleTask = (index) =>
    setTasks((prev) =>
      prev.map((t, i) => (i === index ? { ...t, done: !t.done } : t))
    );

  const addSubject = (subject) =>
    setSubjects((prev) => [...prev, { ...subject, done: 0 }]);

  return (
    <AppContext.Provider value={{ user, setUser, tasks, addTask, toggleTask, subjects, addSubject }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
