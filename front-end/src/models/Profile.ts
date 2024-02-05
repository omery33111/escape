


export default class Profile {
    id?: number;
    user?: number;
    username: string = "";
    date: string = "";
    activated: boolean = false;
    activation_token: string = "";
}



export interface ProfileState {
    profile: Profile;
    profiles: Profile[];

    isLoading: boolean;
    isError: boolean;
}
