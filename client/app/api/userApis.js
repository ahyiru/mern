import fetcher from './fetcher';
const apis=require('../../../configs/apis');

const {
  listUser,
  addUser,
  editUser,
  deleteUser,
}=apis;

export const listUserFn=params=>fetcher({...listUser,params});
export const addUserFn=data=>fetcher({...addUser,data});
export const editUserFn=data=>fetcher({...editUser,data});
export const deleteUserFn=data=>fetcher({...deleteUser,data});


