import fs from 'node:fs/promises';
import { FileBlob, SpreadsheetFile } from '@oai/artifact-tool';

const inputPath = 'C:/Users/Pc/Documents/ChatGPT/zanvia/ZAVIAN/outputs/ZAVIAN_control.xlsx';
const outputPath = inputPath;
const previewPath = 'C:/Users/Pc/Documents/ChatGPT/zanvia/ZAVIAN/outputs/ventas_preview.png';
const wb = await SpreadsheetFile.importXlsx(await FileBlob.load(inputPath));
const prod = wb.worksheets.getItem('Productos');
const cont = wb.worksheets.getItem('Contactos');
const resumen = wb.worksheets.getItem('Resumen');

// Extend the existing product tracker so new rows can be entered digitally.
prod.getRange('A14:K50').values = Array.from({ length: 37 }, () => [null, null, null, null, null, null, null, null, null, null, null]);
prod.getRange('F13').formulas = [['=IF(E13="","",E13-D13)']];
prod.getRange('F13:F50').fillDown();
prod.getRange('G13').formulas = [['=IF(OR(E13="",D13=0),"",F13/D13)']];
prod.getRange('G13:G50').fillDown();
prod.getRange('B4:B50').dataValidation = { rule: { type: 'list', values: ['PERFUMERÍA', 'GORRAS', 'JOYAS', 'ROPA', 'ACCESORIOS', 'RELOJES', 'BILLETERAS', 'ANTEOJOS', 'CINTURONES', 'RIÑONERAS', 'OTROS'] } };
prod.getRange('I4:I50').dataValidation = { rule: { type: 'list', values: ['Stock', 'Preventa', 'Esperar', 'Descartar'] } };
prod.getRange('D4:G50').format.numberFormat = '"ARS $"#,##0';
prod.getRange('G4:G50').format.numberFormat = '0.0%';
prod.getRange('A14:K50').format = { font: { name: 'Arial', size: 10, color: '#1F2937' }, verticalAlignment: 'center' };
prod.getRange('A14:K50').format.borders = { preset: 'inside', style: 'thin', color: '#E5E7EB' };
prod.getRange('A14:K50').format.rowHeight = 20;

// Make contact management a dropdown workflow.
cont.getRange('D4:D100').dataValidation = { rule: { type: 'list', values: ['Pendiente', 'Contactado', 'Respondió', 'Sin respuesta', 'Seguimiento', 'Cerrado'] } };
cont.getRange('E4:E100').setNumberFormat('yyyy-mm-dd');

// Add a focused digital sales log.
let ventas = wb.worksheets.getItemOrNullObject('Ventas');
if (!ventas || ventas.isNullObject) ventas = wb.worksheets.add('Ventas');
ventas.showGridLines = false;
ventas.getRange('A1:L1').values = [['ZAVIAN | Registro digital de ventas', null, null, null, null, null, null, null, null, null, null, null]];
ventas.getRange('A3:L3').values = [['Fecha', 'Cliente', 'Producto', 'Categoría', 'Proveedor', 'Costo unitario', 'Precio venta unitario', 'Cantidad', 'Total venta', 'Ganancia', 'Estado', 'Observaciones']];
ventas.getRange('A4:L100').values = Array.from({ length: 97 }, () => [null, null, null, null, null, null, null, null, null, null, null, null]);
ventas.getRange('I4').formulas = [['=IF(OR(G4="",H4=""),"",G4*H4)']];
ventas.getRange('I4:I100').fillDown();
ventas.getRange('J4').formulas = [['=IF(OR(F4="",G4="",H4=""),"",(G4-F4)*H4)']];
ventas.getRange('J4:J100').fillDown();
ventas.getRange('A4:A100').setNumberFormat('yyyy-mm-dd');
ventas.getRange('F4:G100').format.numberFormat = '"ARS $"#,##0';
ventas.getRange('I4:J100').format.numberFormat = '"ARS $"#,##0';
ventas.getRange('H4:H100').format.numberFormat = '#,##0';
ventas.getRange('D4:D100').dataValidation = { rule: { type: 'list', values: ['PERFUMERÍA', 'GORRAS', 'JOYAS', 'ROPA', 'ACCESORIOS', 'RELOJES', 'BILLETERAS', 'ANTEOJOS', 'CINTURONES', 'RIÑONERAS', 'OTROS'] } };
ventas.getRange('K4:K100').dataValidation = { rule: { type: 'list', values: ['Reservada', 'Pagada', 'Entregada', 'Cancelada'] } };
ventas.getRange('A1:L100').format.font = { name: 'Arial', size: 10, color: '#1F2937' };
ventas.getRange('A3:L3').format = { fill: '#1F4E78', font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' }, wrapText: true, verticalAlignment: 'center' };
ventas.getRange('A3:L3').format.rowHeight = 30;
ventas.getRange('A1:L100').format.verticalAlignment = 'center';
ventas.getRange('A1:L100').format.columnWidth = 18;
ventas.getRange('A1').format.columnWidth = 14; ventas.getRange('B1').format.columnWidth = 22; ventas.getRange('C1').format.columnWidth = 30; ventas.getRange('L1').format.columnWidth = 34;
ventas.freezePanes.freezeRows(3);
ventas.tables.add('A3:L100', true, 'VentasTable');
prod.tables.add('A3:K50', true, 'ProductosTable');

// Quick digital KPIs on the summary sheet.
resumen.getRange('D3:E7').values = [
  ['Ventas registradas', null],
  ['Ingresos cobrados', null],
  ['Ganancia registrada', null],
  ['Pedidos pendientes', null],
  ['Última actualización', new Date()]
];
resumen.getRange('E3').formulas = [['=COUNTIF(Ventas!$K$4:$K$100,"Pagada")+COUNTIF(Ventas!$K$4:$K$100,"Entregada")']];
resumen.getRange('E4').formulas = [['=SUM(Ventas!$I$4:$I$100)']];
resumen.getRange('E5').formulas = [['=SUM(Ventas!$J$4:$J$100)']];
resumen.getRange('E6').formulas = [['=COUNTIF(Ventas!$K$4:$K$100,"Reservada")']];
resumen.getRange('E4:E5').format.numberFormat = '"ARS $"#,##0';
resumen.getRange('D3:E7').format = { fill: '#F3F4F6', font: { name: 'Arial', size: 10, color: '#1F2937' }, verticalAlignment: 'center' };
resumen.getRange('D3:D7').format.font = { name: 'Arial', size: 10, bold: true, color: '#1F2937' };

wb.recalculate();
const errors = await wb.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!', options: { useRegex: true, maxResults: 100 }, summary: 'digital workbook formula error scan' });
console.log(errors.ndjson);
const check = await wb.inspect({ kind: 'table', range: 'Ventas!A1:L10', include: 'values,formulas', tableMaxRows: 10, tableMaxCols: 12 });
console.log(check.ndjson);
const preview = await wb.render({ sheetName: 'Ventas', range: 'A1:L18', scale: 1, format: 'png' });
await fs.writeFile(previewPath, new Uint8Array(await preview.arrayBuffer()));
const out = await SpreadsheetFile.exportXlsx(wb);
await out.save(outputPath);
