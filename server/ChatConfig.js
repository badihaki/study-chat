const users = [];
const rooms = [];

function addUser( socketID, userName, roomID ){
    const user = { socketID, userName, roomID };
    if(users.includes(socketID)){
        return { error: `User ${socketID} is already here` };
    }
    else{
        users.push(user);
        rooms.push(roomID);
    }
    return {user};
}

function getUser( socketID ){
    const user = users.find( user => user.socketID === socketID );
    if(!user){
        return null;
    }
    return user;
}

function getAllUsersInRoom( roomID ){
    return users.filter( user => user.roomID === roomID );
}

function removeUser( socketID ){
    // const newList = users.filter( userID => userID.toString() !== socketID );
    // console.log(newList);
    // users = newList;
    const userIndex = users.findIndex( user => user.socketID === socketID );
    if(userIndex !== -1){
        return users.splice(userIndex, 1)[0];
    }
}

module.exports = { getUser, getAllUsersInRoom, addUser, removeUser, users, rooms };