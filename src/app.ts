import express, { Application } from 'express';
import morgan from 'morgan';
import path from 'path';
import expressHandlebars from 'express-handlebars';
import methodOverride from 'method-override';
import testRouter from './routes/test.routes';

export class App {

    private app: Application;

    constructor(port?: number | string) {
        this.app = express();
        this.app.set('PORT', process.env.PORT || port || 3000);
        this.setting();
        this.middlewares();
        this.routes();
    }

    private setting(): void {
        this.app.set("views", path.join(__dirname, "view"));
        let hbs = expressHandlebars.create({
            extname: '.hbs',
            partialsDir: path.join(this.app.get('views'), 'partials'),
            defaultLayout: 'main',
            layoutsDir: path.join(this.app.get('views'), 'layout'),
            helpers: {
                foo: function (a: Number, b: Number, opts: any) {
                    return (a == b) ? opts.fn(this) : opts.inverse(this);;
                }
            }
        });
        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(methodOverride('_method'));
    }

    private middlewares(): void {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    private routes(): void {
        this.app.use('/accidentes_manage', testRouter);
    }

    public async listen(): Promise<void> {
        await this.app.listen(this.app.get('PORT'));
        console.log(`Server on port ${this.app.get('PORT')}`);
    }
}