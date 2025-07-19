import { Locator } from '@playwright/test';
export class testData {

    readonly baseURL : string;
    readonly userName : string;
    readonly password : string;

    constructor() {
        this.baseURL = 'https://qa2.hwlmsp.com';
        this.userName = 'progmgr20';
        this.password = 'Y4mth@ng!24';
    }
   
}