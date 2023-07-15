import { Router, Request, Response } from "express";

const router: Router = Router();

router.get("/mensajes", (req: Request, res: Response) => {
    
    res.json({
        ok: true,
        mensaje: 'Todo esta bien!'
    })
});

router.post("/mensajes", (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    console.log(cuerpo);
    console.log(de);
    
    res.json({
        ok: true,
        mensaje: 'Todo esta bien desde el post!',
        cuerpo,
        de
    })
});

router.post("/mensajes/:id", (req: Request, res: Response) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    console.log(cuerpo);
    console.log(de);
    console.log(id);
    
    res.json({
        ok: true,
        mensaje: 'Todo esta bien desde el post!',
        cuerpo,
        de,
        id
    })
});

export default router;