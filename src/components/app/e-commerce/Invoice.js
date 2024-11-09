// Componente Invoice: Representa la factura de un pedido específico, mostrando detalles como el cliente, productos y totales. 
// Este componente se relaciona con el componente IconButton para las acciones de descarga, impresión y recepción de pagos,
// así como con otros componentes que podrían estar mostrando el historial de pedidos o la información del cliente.

import logoInvoice from 'assets/img/logos/logo-invoice.png';
import IconButton from 'components/common/IconButton';
import React from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import SimpleBarReact from 'simplebar-react';

const Invoice = () => {
  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Row className="justify-content-between align-items-center">
            <Col md>
              <h5 className="mb-2 mb-md-0">Orden #AD20294</h5> {/* Muestra el número de orden */}
            </Col>
            <Col xs="auto">
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="arrow-down"
                className="me-1 mb-2 mb-sm-0"
                iconClassName="me-1"
              >
                Descargar (.pdf) {/* Botón para descargar la factura en formato PDF */}
              </IconButton>
              <IconButton
                variant="falcon-default"
                size="sm"
                icon="print"
                iconClassName="me-1"
                className="me-1 mb-2 mb-sm-0"
              >
                Imprimir {/* Botón para imprimir la factura */}
              </IconButton>
              <IconButton
                variant="falcon-success"
                size="sm"
                icon="dollar-sign"
                className="mb-2 mb-sm-0"
              >
                Recibir Pago {/* Botón para registrar el pago */}
              </IconButton>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Row className="align-items-center text-center mb-3">
            <Col sm={6} className="text-sm-start">
              <img src={logoInvoice} alt="factura" width={150} /> {/* Muestra el logo de la empresa */}
            </Col>
            <Col className="text-sm-end mt-3 mt-sm-0">
              <h2 className="mb-3">Factura</h2> {/* Título de la factura */}
              <h5>Falcon Design Studio</h5> {/* Nombre de la empresa */}
              <p className="fs-10 mb-0">
                156 University Ave, Toronto <br /> On, Canadá, M5H 2H7
              </p> {/* Dirección de la empresa */}
            </Col>
            <Col xs={12}>
              <hr />
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col>
              <h6 className="text-500">Factura a</h6> {/* Título "Factura a" */}
              <h5>Antonio Banderas</h5> {/* Nombre del cliente */}
              <p className="fs-10">
                1954 Bloor Street West
                <br />
                Toronto ON, M6P 3K9
                <br />
                Canadá
              </p> {/* Dirección del cliente */}
              <p className="fs-10">
                <a href="mailto:example@gmail.com">example@gmail.com</a>
                <br />
                <a href="tel:444466667777">+4444-6666-7777</a> {/* Información de contacto del cliente */}
              </p>
            </Col>
            <Col sm="auto" className="ms-auto">
              <div className="table-responsive">
                <Table borderless size="sm" className="fs-10">
                  <tbody>
                    <tr>
                      <th className="text-sm-end">Número de Factura:</th>
                      <td>14</td> {/* Número de factura */}
                    </tr>
                    <tr>
                      <th className="text-sm-end">Número de Orden:</th>
                      <td>AD20294</td> {/* Número de orden */}
                    </tr>
                    <tr>
                      <th className="text-sm-end">Fecha de Factura:</th>
                      <td>2018-09-25</td> {/* Fecha de la factura */}
                    </tr>
                    <tr>
                      <th className="text-sm-end">Pago Vencido:</th>
                      <td>A la recepción</td> {/* Condiciones de pago */}
                    </tr>
                    <tr className="alert alert-success fw-bold">
                      <th className="text-success-emphasis text-sm-end">
                        Monto a Pagar:
                      </th>
                      <td className="text-success-emphasis">$19688.40</td> {/* Monto total a pagar */}
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Col>
          </Row>

          <div className="mt-4 fs-10">
            <SimpleBarReact>
              <Table striped className="border-bottom">
                <thead data-bs-theme="light">
                  <tr className="bg-primary dark__bg-1000">
                    <th className="text-white border-0">Productos</th>
                    <th className="text-white border-0 text-center">Cantidad</th>
                    <th className="text-white border-0 text-end">Tarifa</th>
                    <th className="text-white border-0 text-end">Monto</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="align-middle">
                      <h6 className="mb-0 text-nowrap">
                        Paquete de hosting web Platinum
                      </h6>
                      <p className="mb-0">Bajada 35mb, Subida 100mb</p> {/* Descripción del producto */}
                    </td>
                    <td className="align-middle text-center">2</td>
                    <td className="align-middle text-end">$65.00</td>
                    <td className="align-middle text-end">$130.00</td>
                  </tr>
                  <tr>
                    <td className="align-middle">
                      <h6 className="mb-0 text-nowrap">Diseño de sitio web de 2 páginas</h6>
                      <p className="mb-0">
                        Incluye wireframes básicos y plantillas responsivas {/* Descripción del producto */}
                      </p>
                    </td>
                    <td className="align-middle text-center">1</td>
                    <td className="align-middle text-end">$2,100.00</td>
                    <td className="align-middle text-end">$2,100.00</td>
                  </tr>
                  <tr>
                    <td className="align-middle">
                      <h6 className="mb-0 text-nowrap">Desarrollo de Aplicaciones Móviles</h6>
                      <p className="mb-0">Incluye navegación responsiva</p> {/* Descripción del producto */}
                    </td>
                    <td className="align-middle text-center">8</td>
                    <td className="align-middle text-end">$500.00</td>
                    <td className="align-middle text-end">$4,000.00</td>
                  </tr>
                  <tr>
                    <td className="align-middle">
                      <h6 className="mb-0 text-nowrap">Desarrollo de Aplicaciones Web</h6>
                      <p className="mb-0">Incluye SPA en react</p> {/* Descripción del producto */}
                    </td>
                    <td className="align-middle text-center">6</td>
                    <td className="align-middle text-end">$2,000.00</td>
                    <td className="align-middle text-end">$12,000.00</td>
                  </tr>
                </tbody>
              </Table>
            </SimpleBarReact>
          </div>

          <Row className="justify-content-end">
            <Col xs="auto">
              <Table borderless size="sm" className="fs-10 text-end">
                <tbody>
                  <tr>
                    <th className="text-900">Subtotal:</th>
                    <td className="fw-semibold">$18,230.00</td> {/* Subtotal */}
                  </tr>
                  <tr>
                    <th className="text-900">Impuesto 8%:</th>
                    <td className="fw-semibold">$1,458.40</td> {/* Impuesto */}
                  </tr>
                  <tr className="border-top">
                    <th className="text-900">Total:</th>
                    <td className="fw-semibold">$19,688.40</td> {/* Total */}
                  </tr>
                  <tr className="border-top border-top-2 fw-bolder text-900">
                    <th className="text-900">Monto a Pagar:</th>
                    <td className="text-900">$19,688.40</td> {/* Monto a pagar */}
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer className="bg-body-tertiary">
          <p className="fs-10 mb-0">
            <strong>Notas: </strong> Apreciamos mucho su negocio y si hay algo más que podamos hacer, ¡háganoslo saber! {/* Notas adicionales */}
          </p>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Invoice;
