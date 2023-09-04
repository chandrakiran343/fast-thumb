import { getUsers } from "../queries/queries";

let DATA: any = [
];

async function fetchUserData() {

  // const q = query(collection(db, "users"));
  const usersFetched = await getUsers()
    console.log("Current cities in CA: ", usersFetched);
    usersFetched.sort((a: any, b: any) => b.score - a.score)
    usersFetched.forEach((e, _: any) => {
      DATA.push({
        value: e.score,
        label: e.name
      })
    })
  // console.log(DATA)
}

export function updateData(data:any){
  DATA = data
}

// Return random data from a mock data array
export function getData() {
  return new Promise(resolve => {
    fetchUserData().then(() => {
      const ascending = DATA;
      console.log(ascending)
      resolve(ascending);
    })
  });
}