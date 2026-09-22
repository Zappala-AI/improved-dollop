import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const outputDir = 'C:/Users/Pc/Documents/ChatGPT/zanvia/ZAVIAN/outputs';
await fs.mkdir(outputDir, { recursive: true });
const wb = Workbook.create();
const resumen = wb.worksheets.add('Resumen');
const prov = wb.worksheets.add('Proveedores');
const prod = wb.worksheets.add('Productos');
const cont = wb.worksheets.add('Contactos');
const font = 'Arial';
for (const s of [resumen, prov, prod, cont]) { s.showGridLines = false; s.getRange('A1:Z200').format.font = { name: font, size: 10, color: '#1F2937' }; }

resumen.getRange('A1:H1').values = [['ZAVIAN | Control inicial de investigación comercial', null, null, null, null, null, null, null]];
resumen.getRange('A3:B7').values = [
  ['Capital disponible', 10000],
  ['Zona prioritaria', 'Villa Krause / Rawson'],
  ['Criterio de decisión', 'Capital + demanda + rotación + riesgo'],
  ['Hallazgo principal', 'Beautysis publica venta mayorista sin mínimo de compra'],
  ['Limitación', 'No se verificó precio de venta local para calcular ganancia real']
];
resumen.getRange('A9:H9').values = [['Producto / camino', 'Proveedor', 'Compra publicada', 'Venta local verificada', 'Ganancia', 'Modalidad', 'Estado', 'Fuente']];
resumen.getRange('A10:H15').values = [
  ['Aros colgantes City Girl', 'Beautysis', 2800, null, null, 'Stock pequeño / prueba', 'Puede comprar ahora', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Set aros + collar City Girl', 'Beautysis', 3900, null, null, 'Stock pequeño / prueba', 'Puede comprar ahora', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Perfume City Girl 50 ml', 'Beautysis', 7300, null, null, 'Preventa preferida', 'Puede comprar 1 unidad, riesgo alto', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Perfume Zatys 50 ml', 'Beautysis', 9000, null, null, 'Preventa preferida', 'Puede comprar 1 unidad, riesgo alto', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['CRV4 bijou / acero', 'CRV4', 60000, null, null, 'Preventa / esperar capital', 'No compatible hoy', 'joyerianobel.com / ficha local'],
  ['DiVerSa surtido', 'DiVerSa', 50000, null, null, 'Preventa / esperar capital', 'No compatible hoy', 'diversamayorista.com.ar/quienes-somos']
];
resumen.getRange('E10').formulas = [['=IF(D10="","",D10-C10)']]; resumen.getRange('E10:E15').fillDown();
resumen.getRange('A17:H17').values = [['Nota', 'Los campos de venta y ganancia quedan vacíos hasta verificar precios de venta en San Juan. No usar precios de MercadoLibre como precio local confirmado.', null, null, null, null, null, null]];

prov.getRange('A1:J1').values = [['PROVEEDORES SAN JUAN', null, null, null, null, null, null, null, null, null]];
prov.getRange('A3:J3').values = [['Negocio', 'Rubro', 'Localidad / zona', 'Dirección', 'Teléfono / WhatsApp', 'Email', 'Mínimo publicado', 'Productos / alcance', 'Estado para ZAVIAN', 'Fuente']];
prov.getRange('A4:J10').values = [
  ['Beautysis', 'Belleza, maquillaje, perfumes, accesorios', 'San Juan Capital', 'Mendoza 146 Sur', '2644046210', 'beautysissj@gmail.com', 'Sin mínimo de compra publicado', 'Aros, sets, perfumes, cosmética, accesorios; retiro local', 'Prioridad alta: compatible con prueba pequeña', 'beautysis.tiendanegocio.com'],
  ['Insumos San Juan', 'Insumos / indumentaria ISJ', 'Rawson / Villa Krause', 'Av. Mendoza 4500 Sur', '264 4468 468', 'administracion@insumos-sanjuan.com', 'No verificado', 'Indumentaria ISJ y otros productos del sitio', 'Contactar: ubicación prioritaria, condiciones no verificadas', 'insumos-sanjuan.com/contact'],
  ['El Águila Centro', 'Polirrubro, accesorios, bazar, mates', 'San Juan Capital', 'Laprida 159 Este', '264 321-2913', 'No publicado', 'Mayorista desde 6 unidades por producto', 'Accesorios, mates/termos, gorros, pelo, bazar', 'Contactar: variedad y mínimo claro; precios requieren consulta', 'elaguilamayorista.com'],
  ['DiVerSa', 'Accesorios, acero, bijou, cosmética, marroquinería', 'San Juan Capital', 'General Acha Sur 388', '264 626 5027', '[email protected]', 'Compra mínima publicada $50.000', 'Amplio surtido y envíos', 'No compatible hoy; útil para segunda etapa', 'diversamayorista.com.ar/quienes-somos'],
  ['CRV4 Bijou', 'Bijouterie, acero, plata, marroquinería', 'Capital / Trinidad', 'Avellaneda 648', '0264 482-3420', '[email protected]', 'Compra mínima informada por ficha: $60.000', 'Joyas, acero, billeteras, lentes', 'No compatible hoy; evaluar preventa colectiva', 'cylex.com.ar / joyerianobel.com.ar'],
  ['África Mayorista', 'Indumentaria intervenida', 'San Juan', 'Dirección exacta no publicada en fuente consultada', '+54 9 264 526-6845', 'comercial@africamayorista.com.ar', 'No verificado', 'Prendas con tachas, bordados y pedrería', 'Preventa / producto de mayor valor', 'africamayorista.com.ar'],
  ['Basik Indumentaria', 'Streetwear', 'San Juan Capital', 'Mitre 609 Oeste', '2644415731', '[email protected]', 'No verificado', 'Indumentaria urbana; tienda física y online', 'Preventa; precios publicados altos para capital actual', 'basikindumentaria.com']
];

prod.getRange('A1:K1').values = [['PRODUCTOS Y PRUEBAS', null, null, null, null, null, null, null, null, null, null]];
prod.getRange('A3:K3').values = [['Producto', 'Categoría', 'Proveedor', 'Compra', 'Venta verificada SJ', 'Ganancia', 'Margen', 'Capital para prueba', 'Stock / preventa', 'Demanda / rotación observada', 'Fuente']];
prod.getRange('A4:K12').values = [
  ['Aros colgantes City Girl', 'Joyería', 'Beautysis', 2800, null, null, null, 8400, 'Stock: 3 unidades', 'Producto visual, ticket bajo; demanda local aún por validar', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Aritos colgantes City Girl', 'Joyería', 'Beautysis', 3400, null, null, null, 6800, 'Stock: 2 unidades', 'Producto visual, ticket bajo; demanda local aún por validar', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Set aros + collar City Girl', 'Joyería', 'Beautysis', 3900, null, null, null, 7800, 'Stock: 2 unidades', 'Kit fácil de mostrar; demanda local aún por validar', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Set aros + collar City Girl', 'Joyería', 'Beautysis', 4400, null, null, null, 8800, 'Stock: 2 unidades', 'Kit fácil de mostrar; demanda local aún por validar', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Perfume City Girl Soft Caramel 50 ml', 'Perfumería', 'Beautysis', 7300, null, null, null, 7300, 'Preventa preferida', 'Ticket más alto; no comprar sin pedido confirmado', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Perfume City Girl Wild Desire 50 ml', 'Perfumería', 'Beautysis', 7300, null, null, null, 7300, 'Preventa preferida', 'Ticket más alto; no comprar sin pedido confirmado', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Perfume Zatys Magesty 50 ml', 'Perfumería', 'Beautysis', 9000, null, null, null, 9000, 'Preventa preferida', 'Ticket alto para capital inicial; validar salida', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Tira para celular City Girl', 'Accesorios', 'Beautysis', 7700, null, null, null, 7700, 'Preventa', 'Precio de compra alto para prueba; demanda no verificada', 'beautysis.tiendanegocio.com/productos/accesorios-varios'],
  ['Mascarilla facial Bioaqua', 'Otros / cosmética', 'Beautysis', 480, null, null, null, 4800, 'Stock: 10 unidades', 'Ticket muy bajo y fácil de transportar; validar si ZAVIAN quiere sumar belleza', 'beautysis.tiendanegocio.com']
];
prod.getRange('F4').formulas = [['=IF(E4="","",E4-D4)']]; prod.getRange('F4:F12').fillDown();
prod.getRange('G4').formulas = [['=IF(OR(E4="",D4=0),"",F4/D4)']]; prod.getRange('G4:G12').fillDown();

cont.getRange('A1:F1').values = [['CONTACTOS Y SEGUIMIENTO', null, null, null, null, null]];
cont.getRange('A3:F3').values = [['Negocio', 'Contacto', 'Mensaje personalizado', 'Estado', 'Fecha de contacto', 'Seguimiento']];
cont.getRange('A4:F10').values = [
  ['Beautysis', '2644046210 / beautysissj@gmail.com', 'Hola, ¿cómo están? Mi nombre es Thiago y estoy comenzando ZAVIAN en San Juan, enfocado en moda económica y accesorios. Vi que trabajan como mayoristas sin mínimo de compra. ¿Me pueden confirmar si mantienen esa condición, pasarme el catálogo vigente y recomendarme 5 productos económicos con buena salida para comenzar con poca cantidad? También quisiera saber si permiten publicar fotos con sus precios y trabajar por preventa, y cómo funciona el retiro local.', 'Pendiente', null, 'Consultar mínimo real, stock, fotos y permiso de publicación'],
  ['Insumos San Juan', '2644468468 / administracion@insumos-sanjuan.com', 'Hola, ¿cómo están? Soy Thiago y estoy iniciando ZAVIAN en Villa Krause, una tienda de moda económica y accesorios. Vi que tienen sucursal en Av. Mendoza 4500 Sur y una sección de indumentaria. ¿Trabajan con precios para emprendedores o cantidades pequeñas? ¿Pueden enviarme catálogo, precios, compra mínima y productos de rápida salida?', 'Pendiente', null, 'Confirmar rubro, catálogo y modalidad de reventa'],
  ['El Águila Centro', '2643212913', 'Hola, soy Thiago y estoy comenzando ZAVIAN en San Juan con moda económica y accesorios. Vi que trabajan mayorista y minorista y que aplican precios por cantidad. ¿Me pueden compartir la lista de accesorios, mates, gorros o productos pequeños que tengan mejor salida, con precios por unidad y desde 6 unidades? ¿Permiten preventa o publicación de fotos?', 'Pendiente', null, 'Pedir catálogo y precios de accesorios de ticket bajo'],
  ['DiVerSa', '2646265027 / [email protected]', 'Hola, soy Thiago y estoy comenzando ZAVIAN en San Juan. Me interesa conocer su surtido de accesorios, acero, bijou, marroquinería y aromas. Como estoy probando el mercado con capital limitado, ¿tienen alguna línea, promoción o modalidad de compra menor a la compra mínima publicada? ¿Permiten preventa con pedido confirmado?', 'Pendiente', null, 'Consultar alternativas al mínimo de $50.000'],
  ['CRV4 Bijou', '02644823420 / [email protected]', 'Hola, soy Thiago y estoy comenzando ZAVIAN en San Juan. Busco accesorios y bijouterie para reventa, especialmente piezas económicas y de buena rotación. ¿Pueden confirmarme la compra mínima vigente, si existe surtido por pocas unidades y si permiten trabajar por preventa o tomar pedidos antes de comprar?', 'Pendiente', null, 'Confirmar mínimo y posibilidad de preventa'],
  ['África Mayorista', '+5492645266845 / comercial@africamayorista.com.ar', 'Hola, soy Thiago y estoy comenzando ZAVIAN en San Juan. Me interesa conocer prendas de entrada y condiciones para emprendedores. ¿Tienen catálogo, precios mayoristas, compra mínima y alguna modalidad de preventa? También quisiera saber qué prendas intervenidas recomiendan para probar con poca inversión.', 'Pendiente', null, 'Pedir catálogo de entrada y mínimos'],
  ['Basik Indumentaria', '2644415731 / [email protected]', 'Hola, soy Thiago y estoy comenzando ZAVIAN, una tienda de moda económica y accesorios en San Juan. Me interesa evaluar indumentaria urbana mediante preventa. ¿Trabajan con precios para revendedores, descuentos por cantidad o autorización para publicar productos antes de comprar? ¿Qué prendas de menor inversión recomiendan?', 'Pendiente', null, 'Validar condiciones comerciales']
];

for (const s of [resumen, prov, prod, cont]) {
  s.getRange('A1:K1').format = { font: { name: font, size: 14, bold: true, color: '#111827' } };
  s.getRange('A3:K3').format = { fill: '#1F4E78', font: { name: font, size: 10, bold: true, color: '#FFFFFF' }, wrapText: true, verticalAlignment: 'center' };
  s.getRange('A3:K200').format.verticalAlignment = 'center';
  s.getRange('A3:K200').format.wrapText = false;
  s.getRange('A3:K3').format.rowHeight = 30;
  s.getUsedRange().format.autofitColumns();
}
resumen.getRange('B3').format.numberFormat = '"ARS $"#,##0';
resumen.getRange('C10:E15').format.numberFormat = '"ARS $"#,##0';
prod.getRange('D4:F12').format.numberFormat = '"ARS $"#,##0';
prod.getRange('G4:G12').format.numberFormat = '0.0%';
for (const s of [resumen, prov, prod, cont]) { s.getRange('A1:K200').format.columnWidth = 18; s.getRange('A1').format.columnWidth = 34; s.getRange('B1').format.columnWidth = 24; }
resumen.getRange('H10:H15').format.columnWidth = 42; prod.getRange('J4:K12').format.columnWidth = 42; cont.getRange('C4:C10').format.columnWidth = 70; cont.getRange('F4:F10').format.columnWidth = 38;
prov.freezePanes.freezeRows(3); prod.freezePanes.freezeRows(3); cont.freezePanes.freezeRows(3);
wb.recalculate();
const check = await wb.inspect({ kind: 'table', range: 'Resumen!A1:H15', include: 'values,formulas', tableMaxRows: 15, tableMaxCols: 8 });
console.log(check.ndjson);
const errors = await wb.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!', options: { useRegex: true, maxResults: 100 }, summary: 'formula error scan' });
console.log(errors.ndjson);
const preview = await wb.render({ sheetName: 'Resumen', autoCrop: 'all', scale: 1, format: 'png' });
await fs.writeFile(`${outputDir}/resumen_preview.png`, new Uint8Array(await preview.arrayBuffer()));
const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(`${outputDir}/ZAVIAN_control.xlsx`);
