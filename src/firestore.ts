import {addDoc, collection, doc, getDocs, orderBy, query, setDoc, where} from 'firebase/firestore';
import {db} from './firebase';

const PLAYER_COLLECTION='go-players';


export interface Player{
    id: string;
    name: string;
    location: string;
    bio: string;
    status: string;
    uid: string;
    createDate: string;
}

export function addPlayerProfile(uid:string, name:string, rankInfo:string, bio:string, status:string, createDate:string   ){
   return addDoc(collection(db, PLAYER_COLLECTION), {uid, name, rankInfo, bio, status, createDate })
}

export function setPlayerProfile(uid:string, name:string, rankInfo:string, bio:string, status:string, createDate:string   ){
     const docData = {
        name:name,
        rankInfo:rankInfo,
        bio:bio,
        status:status,
        createDate:createDate
     }
     return setDoc(doc(db,PLAYER_COLLECTION,uid),docData);
   
    //return addDoc(collection(db, PLAYER_COLLECTION), {uid, name, rankInfo, bio, status, createDate })
 }

export async function getPlayersAll(){
    const otherPlayersQueryAll=query(collection(db,PLAYER_COLLECTION),  orderBy("name","asc"));
    const querySnapshot= await getDocs(otherPlayersQueryAll);

    const players: Player[] = [];

    for(const documentSnapshot of querySnapshot.docs){
            const player:Player = documentSnapshot.data() as Player;
            console.log('player', player);
            await players.push({
                ...(player)
            })

    }
    return players;
}

export async function getPlayer(uid:string):Promise<Player|null>{
    const playersQuery=query(collection(db,PLAYER_COLLECTION), where("uid","==",uid) );
    const querySnapshot= await getDocs(playersQuery);

   console.log('querySnapshot',querySnapshot);
  // const player:Player=null as Player;
    if(querySnapshot?.docs.length>0)
    {

        const player:Player = querySnapshot.docs[0].data() as Player;
        //const player:Player = documentSnapshot.data() as Player;
        return player;
   }
   else return null;

    // const players: Player[] = [];

    // for(const documentSnapshot of querySnapshot.docs){
    //         const player:Player = documentSnapshot.data() as Player;
    //         console.log('player', player);
    //         await players.push({
    //             ...(player)
    //         })

    // }
    // return players;
}