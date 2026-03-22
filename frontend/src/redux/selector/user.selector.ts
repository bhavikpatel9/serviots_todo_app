import { useSelector } from "react-redux"
import { currentUser, type UserState } from "../ducks/user"

export const SelectUser = (): UserState => {
    const user = useSelector(currentUser);
    return user;
}