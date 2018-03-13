module.exports = () => {
    const header = () => {
        const freeSpace = ' '.repeat(10);
        console.log(('-').repeat(110));
        console.log('                               ТАБЛИЦА С РЕЗУЛТАТИ         ');
        console.log(('-').repeat(110));
        console.log('    МЯСТО ', freeSpace, freeSpace, 'ТРАНСПОРТ', freeSpace, freeSpace, '  ЦЕНА', freeSpace, '   НОЩУВКИ и ОПИСАНИЕ');
        console.log(('-').repeat(110));
    }
    return header();
}