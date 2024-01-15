import axios from "axios";
import { instaRecURL } from "../../endpoints/endpoints";
import { InstaRec } from "../../models/InstaRec";



export function getAllInstaRecs() {
    return new Promise<{ data: InstaRec[] }>((resolve) =>
      axios.get(`${instaRecURL}/get_all_instarecs/`).then((res) => resolve({ data: res.data })
      )
    );
}



export function getCarInstaRecs(page: number) {
    return new Promise<{ data: InstaRec[] }>((resolve) =>
      axios.get(`${instaRecURL}/get_car_insta_recs/${page}/`).then((res) => resolve({ data: res.data })
      )
    );
}


export function getInstaRecCarAmount() {
    return new Promise<{ data: number }>((resolve =>
        axios.get(`${instaRecURL}/get_instarec_amount/`).then(res => resolve({ data: res.data })
        )
    ))
}
