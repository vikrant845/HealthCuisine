import { UserModel } from "./userModel";

export interface LoginResponse {
    message: string,
    token: string,
    user: UserModel
}