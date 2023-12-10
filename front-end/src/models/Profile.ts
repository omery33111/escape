


export default class Profile {
    id?: number;
    user?: number;
    username: string = "";
    date: string = "";
}



export interface ProfileState {
    profile: Profile;
    profiles: Profile[];

    isLoading: boolean;
    isError: boolean;
}
