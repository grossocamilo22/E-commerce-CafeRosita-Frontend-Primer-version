

export interface User {
  uid?:string,
  name?: string,
  surname?:string,
  image?:string,
  adress?:string,
  phoneNumber?:number,
  rol?: string,
  email?:string
}

export interface AuthResponse{
  ok: boolean,
  uid?: string,
  name?: string,
  surname?:string,
  image?:string,
  adress?:string,
  phoneNumber?:number,
  rol?: string,
  email?:string
  token?:string
}
