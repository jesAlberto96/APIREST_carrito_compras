import { envs } from '../src/config/envs';
import { Server } from '../src/config/server';

jest.mock( '../src/config/server' );


describe('Should call server with arguments and start', () => {
    test('should work', async () => {

        // await import( '../src/index' );

        expect( Server ).toHaveBeenCalledTimes( 1 );
        // expect( Server ).toHaveBeenCalledWith({
        //     port: envs.PORT,
        //     routes: expect.any( Function )
        // });

        // expect( Server.prototype.start ).toHaveBeenCalledWith();
    });

} );