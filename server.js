// 导入所需的模块
const express = require('express');
const bodyParser = require('body-parser');

// 创建Express应用程序
const app = express();
const port = process.env.PORT || 3000;

// 使用中间件解析请求主体
app.use(bodyParser.json());

// 模拟数据库，存储用户数据
let users = [
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' }
];

// 获取所有用户
app.get('/api/users', (req, res) => {
    res.json(users);
});

// 获取单个用户
app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.json(user);
});

// 创建用户
app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).send('Username and email are required');
    }
    const newUser = { id: users.length + 1, username, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// 更新用户
app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).send('Username and email are required');
    }
    users[userIndex] = { ...users[userIndex], username, email };
    res.json(users[userIndex]);
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        return res.status(404).send('User not found');
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});

// 处理未找到的路由
app.use((req, res) => {
    res.status(404).send('Not found');
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// 启动服务器监听指定端口
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
