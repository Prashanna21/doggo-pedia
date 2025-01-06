export type TCardComponentProps = {
  imgSrc? : string;
  title? : string;
  origin?: string;
  description?: string;
  behaviour?: string;
  lifespan?: string;
  className? : string;
  renderKey? : string;
}

export type TCreateAccountData = {
  username : string;
  password: string;
  email: string;
}