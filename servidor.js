const express = require('express');
const app = express();
const port = 3000;

let users = [];
let products = [];
let userId = 1;
let productId = 1;

app.use(express.json());

const validateUser  = (user) => {
    if (!user.name || user.name.length < 3) {
        return "'Nome' deve conter no mínimo 3 caracteres";
    }
    if (user.name.length > 150) {
        return "'Nome' deve conter no máximo 150 caracteres";
    }
    if (!user.cpf || user.cpf.length !== 11 || !/^\d+$/.test(user.cpf)) {
        return "'Cpf' deve conter 11 caracteres e apenas números";
    }
    if (!user.email || user.email.length < 3 || user.email.length > 100 || !user.email.includes('@') || !user.email.split('@')[1].includes('.')) {
        return "'Email' deve conter no mínimo 3 caracteres, máximo 100 caracteres, conter '@' e '.' após o '@'";
    }
    return null;
};

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const error = validateUser (req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    const newUser  = { id: userId++, ...req.body };
    users.push(newUser );
    res.status(201).json({ message: "Usuário cadastrado com sucesso" });
});

app.get('/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });
    res.json(user);
});

app.put('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "Usuário não encontrado" });

    const error = validateUser (req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    
    users[userIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json({ message: "Usuário atualizado com sucesso" });
});

app.delete('/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: "Usuário não encontrado" });

    users.splice(userIndex, 1);
    res.json({ message: "Usuário removido com sucesso" });
});

const validateProduct = (product) => {
    if (!product.name || product.name.length < 3) {
        return "'Nome' deve conter no mínimo 3 caracteres";
    }
    if (product.name.length > 100) {
        return "'Nome' deve conter no máximo 100 caracteres";
    }
    if (!product.price || product.price <= 0) {
        return "'Preço' deve ser maior que 0";
    }
    return null;
};

app.get('/products', (req, res) => {
    res.json(products);
});

app.post('/products', (req, res) => {
    const error = validateProduct(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    const newProduct = { id: productId++, ...req.body };
    products.push(newProduct);
    res.status(201).json({ message: "Produto cadastrado com sucesso" });
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).json({ message: "Produto não encontrado" });
    res.json(product);
});

app.put('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: "Produto não encontrado" });

    const error = validateProduct(req.body);
    if (error) {
        return res.status(400).json({ message: error });
    }
    
    products[productIndex] = { id: parseInt(req.params.id), ...req.body };
    res.json({ message: "Produto atualizado com sucesso" });
});

app.delete('/products/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).json({ message: "Produto não encontrado" });

    products.splice(productIndex, 1);
    res.json({ message: "Produto removido com sucesso" });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});