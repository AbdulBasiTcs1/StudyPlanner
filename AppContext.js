// AppContext.js — Global state synced with Firebase
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ref, onValue, set, push, update, remove } from 'firebase/database';
import { db } from './firebaseConfig';
import { LIGHT_COLORS, DARK_COLORS } from './theme';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Abdul Basit',
    reg: 'SP24-BCS-033',
    email: 'sp24-bcs-033@cuiatk.edu.pk',
    sem: 'Semester 5',
  });

  const [tasks, setTasks] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [aiNotes, setAiNotes] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const themeColors = isDarkMode ? DARK_COLORS : LIGHT_COLORS;

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  // Fetch Data from Firebase Realtime Database
  useEffect(() => {
    // 1. Users Node
    const userRef = ref(db, 'users/user1');
    const unsubscribeUser = onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setUser(snapshot.val());
      } else {
        // Seed default user if not exists
        set(userRef, user).catch(err => console.log("User seed error: ", err.message));
      }
    }, (error) => alert('Users DB Error: ' + error.message));

    // 2. Subjects Node
    const subjectsRef = ref(db, 'subjects');
    const unsubscribeSubjects = onValue(subjectsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsedSubjects = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setSubjects(parsedSubjects);
      } else {
        setSubjects([]);
        // Seed a default subject so the 'subjects' node appears in the DB
        const newSubjRef = push(subjectsRef);
        set(newSubjRef, { name: 'Welcome Subject', icon: '👋', color: '#e8365d', topics: 5, done: 0 })
          .catch(err => console.log("Subjects seed error: ", err.message));
      }
    }, (error) => alert('Subjects DB Error: ' + error.message));

    // 3. Tasks Node
    const tasksRef = ref(db, 'tasks');
    const unsubscribeTasks = onValue(tasksRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsedTasks = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setTasks(parsedTasks);
      } else {
        setTasks([]);
        // Seed a default task so the 'tasks' node appears in the DB
        const newTaskRef = push(tasksRef);
        set(newTaskRef, { title: 'Welcome Task', p: 'h', done: false, createdAt: new Date().toISOString() })
          .catch(err => console.log("Tasks seed error: ", err.message));
      }
    }, (error) => alert('Tasks DB Error: ' + error.message));

    // 4. AI Notes Node
    const aiNotesRef = ref(db, 'ai_notes');
    const unsubscribeAiNotes = onValue(aiNotesRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsedNotes = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        // sort by newest first
        parsedNotes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setAiNotes(parsedNotes);
      } else {
        setAiNotes([]);
        // Seed a default AI note so the 'ai_notes' node appears in the DB
        const newNoteRef = push(aiNotesRef);
        set(newNoteRef, { prompt: 'Welcome', response: 'This is a sample AI note generated automatically to create the database node.', createdAt: new Date().toISOString() })
          .catch(err => console.log("AI Notes seed error: ", err.message));
      }
    }, (error) => alert('AI Notes DB Error: ' + error.message));

    return () => {
      unsubscribeUser();
      unsubscribeSubjects();
      unsubscribeTasks();
      unsubscribeAiNotes();
    };
  }, []);

  // -- Firebase CRUD Helpers --

  const addTask = async (task) => {
    const tasksRef = ref(db, 'tasks');
    const newTaskRef = push(tasksRef);
    await set(newTaskRef, { ...task, done: false, createdAt: new Date().toISOString() });
  };

  const toggleTask = async (taskObj) => {
    if (!taskObj.id) return;
    const taskRef = ref(db, `tasks/${taskObj.id}`);
    await update(taskRef, { done: !taskObj.done });
  };
  
  const deleteTask = async (taskId) => {
    if (!taskId) return;
    const taskRef = ref(db, `tasks/${taskId}`);
    await remove(taskRef);
  };

  const addSubject = async (subject) => {
    const subjectsRef = ref(db, 'subjects');
    const newSubjRef = push(subjectsRef);
    await set(newSubjRef, { ...subject, done: 0 });
  };
  
  const deleteSubject = async (subjectId) => {
    if (!subjectId) return;
    const subjRef = ref(db, `subjects/${subjectId}`);
    await remove(subjRef);
  };

  const addAiNote = async (note) => {
    const notesRef = ref(db, 'ai_notes');
    const newNoteRef = push(notesRef);
    await set(newNoteRef, { ...note, createdAt: new Date().toISOString() });
  };
  
  const deleteAiNote = async (noteId) => {
    if (!noteId) return;
    const noteRef = ref(db, `ai_notes/${noteId}`);
    await remove(noteRef);
  }
  const updateUserProfile = async (newProfile) => {
    const userRef = ref(db, 'users/user1');
    await update(userRef, newProfile);
  };

  return (
    <AppContext.Provider value={{ 
      user, updateUserProfile, 
      tasks, addTask, toggleTask, deleteTask, 
      subjects, addSubject, deleteSubject,
      aiNotes, addAiNote, deleteAiNote,
      isDarkMode, toggleDarkMode, themeColors
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
