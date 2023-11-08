import {create} from 'zustand'


export const useEmailUser = create(set => ({
    email: "",
    setEmail:(newEmail) => set({email: newEmail})
  }));