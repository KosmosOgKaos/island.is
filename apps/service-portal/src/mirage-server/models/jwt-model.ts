import { Actor, ActorDto } from './actor'
import { Subject, SubjectDto } from './subject'
import { addHours, format } from 'date-fns'
//@ts-ignore
import * as jwt from 'webcrypto-jwt'

export interface JwtPayload {
  actor: ActorDto
  sub: SubjectDto
  scope: string[]
  exp: string
  iat: string
}

export class JwtToken implements JwtPayload {
  actor: ActorDto
  sub: SubjectDto
  scope: string[]
  exp: string
  iat: string

  constructor(actor: Actor, subject: Subject, scope: string[]) {
    const sub: SubjectDto = {
      name: subject.name,
      nationalId: subject.nationalId,
      subjectType: subject.subjectType,
    }

    const act: ActorDto = {
      name: actor.name,
      nationalId: actor.nationalId,
    }

    this.scope = scope
    this.actor = act
    this.sub = sub
    const issueDate: Date = new Date()
    this.iat = format(issueDate, 'T')
    this.exp = format(addHours(issueDate, 2), 'T')
  }

  public signJwt(secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.signJWT(this, secret, 'HS256', function(
        err: string,
        token: string | PromiseLike<string>,
      ) {
        if (err) reject(err)
        resolve(token)
      })
    })
  }
}

export class JwtUtils {
  static async isValidJwt(token: string, secret: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      jwt.verifyJWT(token, secret, 'HS256', function(
        err: any,
        isValid: boolean | PromiseLike<boolean>,
      ) {
        if (err) reject(err)
        resolve(isValid)
      })
    })
  }

  static async parseJwt(token: string): Promise<JwtToken> {
    return await jwt.parseJWT(token)
  }



}
