const express = require('express');
const app = express();
const { sequelize } = require('./models/index');
const productRoutes = require('./routes/products');
const arrivalRoutes = require('./routes/arrivals');
const orderRoutes = require('./routes/orders');
const reportRoutes = require('./routes/report');
const costRoutes = require('./routes/cost'); // Новий маршрут

app.use(express.json());

app.use('/products', productRoutes);
app.use('/arrivals', arrivalRoutes);
app.use('/orders', orderRoutes);
app.use('/report', reportRoutes);
app.use('/cost', costRoutes); // Використовуємо новий маршрут

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
