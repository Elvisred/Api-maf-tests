import mysql, { RowDataPacket } from 'mysql2/promise';

export class DbConnector {
    private conn?: mysql.Connection;

    constructor() {
        this.init();
    }

    private async init() {
        this.conn = await mysql.createConnection({
            host: '127.0.0.1',
            user: 'test_user',
            password: 'queen',
            database: 'mafia_api_db'
        });
    }

    async getMaxClubId(): Promise<number | null> {
        if (!this.conn) {
            await this.init();
        }
        if (!this.conn) {
            throw new Error('Could not establish a database connection');
        }
    
        try {
            const [rows] = await this.conn.execute<RowDataPacket[]>('SELECT MAX(id) FROM players_club');
            const maxIdRow = rows[0];
            if (maxIdRow) {
                const maxId = maxIdRow['MAX(id)'];
                if (typeof maxId === 'number') {
                    return maxId;
                }
            }
            return null;
        } finally {
            if (this.conn) {
                await this.conn.end();
            }
        }
    }
}
