import { Router, Request, Response } from 'express';
import Server from '../classes/server';


const router = Router();


router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        GET: 'Desde Mensajes'
    });
});


// Servicio REST Para Enviar Mensajes A Todos
router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;


    const server = Server.instance;
    const payload = {
        cuerpo,
        de
    }
    // Envia a Todas Las Salas
    server.io.emit('mensaje-nuevo', payload);

    res.json({
        POST: 'Desde Mensajes',
        cuerpo,
        de
    });
});

// Servicio REST Para Enviar Mensajes Privados
router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    // Misma Instancia, Por El Patron Singleton
    const server = Server.instance;
    // in: Conectar Con Alguien En Un Canal / Sala En Especifica
    // emit: Emitir Mensajes / Eventos

    // Ejemplo
    const payload = {
        de,
        cuerpo
    }
    // Envia a Todas Las Salas
    // server.io.emit('mensaje-privado', payload);

    // Envia a Una Sala En Especifica
    server.io.in(id).emit('mensaje-privado', payload);


    res.json({
        POST: 'Desde Mensajes + Parametro.',
        cuerpo,
        de,
        id
    });
});

export default router;