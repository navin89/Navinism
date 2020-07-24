import { Injectable } from '@angular/core';
import { RequestOptions } from '@angular/http';
import { accessByRole } from '../common/permissions';

import { version } from '../common/constants';

interface TokenObj {
  token: string;
  email: string;
  version: string;
}

@Injectable()
export class BaseContextService {
  private static USER_ID_KEY = 'userId';
  private static USER_EMAIL_KEY = 'userEmail';
  private static USER_PROFILE_KEY = 'userProfileKey';
  private static TOKEN_KEY = 'tokenKey';
  private static TOKEN_OBJ_KEY = 'tokenObjectKey';
  private static IS_INIT_LOGIN_KEY = 'isInitKey';
  private static OPTIONS_KEY = 'optionsKey';
  private static TAGS_KEY = 'tagsKey';
  private static ROLE_KEY = 'roleKey';

  constructor() {

  }

  initSession(userdata) {
    this.clearSession();

    const tokenObj: TokenObj = {
      token: userdata.loggedInAs.accessToken,
      email: userdata.loggedInAs.id,
      version
    };

    this.setTokenObj(tokenObj);
    this.setUserId(userdata.loggedInAs.userId);
    this.setEmail(userdata.loggedInAs.emailAddress);
    this.setRoles(userdata.loggedInAs.roles);
    this.setUserPersona(userdata);
    this.setIsInitLogin(true);
    this.initHttpRequestOptions();
  }

  clearSession() {
    localStorage.removeItem(BaseContextService.USER_ID_KEY);
    localStorage.removeItem(BaseContextService.USER_EMAIL_KEY);
    localStorage.removeItem(BaseContextService.TOKEN_KEY);
    localStorage.removeItem(BaseContextService.TOKEN_OBJ_KEY);

    localStorage.removeItem(BaseContextService.USER_PROFILE_KEY);
    localStorage.removeItem(BaseContextService.IS_INIT_LOGIN_KEY);
    localStorage.removeItem(BaseContextService.OPTIONS_KEY);

    sessionStorage.removeItem(BaseContextService.TAGS_KEY);
  }

  setUserId(userId: string) {
    localStorage.setItem(BaseContextService.USER_ID_KEY, userId);
  }

  getUserId(): string {
    const userId: string = localStorage.getItem(BaseContextService.USER_ID_KEY);
    return userId;
  }

  setRoles(roles: string[]) {
    if (roles && roles.length === 0) {
      roles.push('generic');
    }
    sessionStorage.setItem(BaseContextService.ROLE_KEY, JSON.stringify(roles));
  }

  getRoles(): string[] {
    const roles: string = sessionStorage.getItem(BaseContextService.ROLE_KEY);
    if (roles) {
      return JSON.parse(roles);
    } else {
      return [];
    }
  }

  setTokenObj(tokenObj: TokenObj) {
    localStorage.setItem(BaseContextService.TOKEN_OBJ_KEY, JSON.stringify(tokenObj));
  }

  getTokenObj(): TokenObj {
    const tokenObj: TokenObj = JSON.parse(localStorage.getItem(BaseContextService.TOKEN_OBJ_KEY));
    return tokenObj;
  }

  setEmail(email: any) {
    localStorage.setItem(BaseContextService.USER_EMAIL_KEY, JSON.stringify(email));
  }

  getEmail(): any {
    const userEntity = JSON.parse(localStorage.getItem(BaseContextService.USER_EMAIL_KEY));
    return userEntity;
  }

  setUserPersona(userdata: any) {
    const userDetails = {
      firstName: userdata.loggedInAs.firstName,
      lastname: userdata.loggedInAs.lastName,
      emailAddress: userdata.loggedInAs.emailAddress,
      cn: userdata.loggedInAs.cn,
      userId: userdata.loggedInAs.userId
    };

    localStorage.setItem(BaseContextService.USER_PROFILE_KEY, JSON.stringify(userDetails));
  }

  getUserPersona(): any {
    const userProfile = JSON.parse(localStorage.getItem(BaseContextService.USER_PROFILE_KEY));
    return userProfile;
  }

  setIsInitLogin(isLogin: boolean) {
    localStorage.setItem(BaseContextService.IS_INIT_LOGIN_KEY, isLogin.toString());
  }

  checkPermission(permKey: string[]) {
    const rolePerm = [];
    this.getRoles().forEach(role => {
      const roleFound = accessByRole.find((rol) => rol.code === role);
      if (roleFound) {
        rolePerm.push(...roleFound.permissions);
      }
    });
    const permissions: string[] = rolePerm.filter(value => -1 !== permKey.indexOf(value));
    return permissions.length > 0;
  }

  initHttpRequestOptions() {
    const options = new RequestOptions({withCredentials: true});
    this.setHttpRequestOptions(options);
  }

  setHttpRequestOptions(options: RequestOptions) {
    const optionsStr: string = JSON.stringify(options);
    localStorage.setItem(BaseContextService.OPTIONS_KEY, optionsStr);
  }

  getHttpRequestOptions(): any {
    const options = localStorage.getItem(BaseContextService.OPTIONS_KEY);
    if (options) {
      return JSON.parse(options);
    }
    return options;
  }

  setTags(tags: any) {
    sessionStorage.setItem(BaseContextService.TAGS_KEY, JSON.stringify(tags));
  }

  getTags(): any {
    return JSON.parse(sessionStorage.getItem(BaseContextService.TAGS_KEY));
  }
}
