import { isAxiosError } from "axios";
import { msAuthApi } from "../config/api/msAuth.api.config"
import { AuthEntity } from "../domain/entities/user.entity";

export class msAuth {
    static authUser = async (username: string, password: string) => {
        try {
            const {data} = await msAuthApi.post<AuthEntity>('', {
                username,
                password
            });
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
            }else{
                console.log(error);
            }
        }
    }

    static checkTokenAuth = async () => {
        try {
            const {data} = await msAuthApi.get<AuthEntity>('/check-status');
            return data;
        } catch (error) {
            if (isAxiosError(error)) {
                console.log(error);
            }else{
                console.log(error);
            }
        }
    }
}