import axios, { AxiosResponse } from 'axios';

export class HttpManager {
    private static cookie: string = '';

    private static createHeaders() {
        return {
            'Content-Type': 'application/json',
            'Cookie': this.cookie,
        };
    }

    public static async get(url: string): Promise<AxiosResponse> {
        return await axios.get(url, { headers: this.createHeaders() });
    }

    public static async post(url: string, body: any): Promise<AxiosResponse> {
        return await axios.post(url, body, { headers: this.createHeaders() });
    }

    public static async postFile(url: string, filePath: string): Promise<AxiosResponse> {
        const file = require('fs').readFileSync(filePath);
        return await axios.post(url, file, { headers: { 'Content-Type': 'multipart/form-data' } });
    }

    public static async delete(url: string): Promise<AxiosResponse> {
        return await axios.delete(url, { headers: this.createHeaders() });
    }

    public static async put(url: string, body: any): Promise<AxiosResponse> {
        return await axios.put(url, body, { headers: this.createHeaders() });
    }
}
