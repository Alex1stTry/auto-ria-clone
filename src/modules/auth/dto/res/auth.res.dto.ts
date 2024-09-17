import { BaseAuthResDto } from './base-auth.res.dto';
import { TokensResDto } from './tokens.res.dto';

export class AuthResDto {
  user: BaseAuthResDto;
  tokens: TokensResDto;
}
