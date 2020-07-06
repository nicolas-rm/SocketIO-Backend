import { Router, Request, Response } from 'express';


const router = Router();


router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        GET: 'Desde Mensajes'
    });
});

router.post('/mensajes', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    res.json({
        POST: 'Desde Mensajes',
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    res.json({
        POST: 'Desde Mensajes + Parametro.',
        cuerpo,
        de,
        id
    });
});

export default router;