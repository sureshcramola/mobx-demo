import { decorate, observable, action } from "mobx";

// configure({ enforceActions: true });

class UserStore {
    users = [];

    addUser = (user) => {
        this.users.push(user);
    }

    deleteUser = (userId) => {
        let updatedUsers = this.users.slice() //copy array from prevState
        updatedUsers.splice(userId, 1) // remove element
        this.users.replace(updatedUsers);
    }
}

decorate(UserStore, {
    users: observable,
    deleteUser: action,
    addUser: action
})

const userStore = new UserStore();
export default userStore;