import { AppDataSource } from "../data-source";
import { Client } from "../entity/Client";

export async function getAllClients(request, response) {
  const clients = await AppDataSource.getRepository(Client).find().catch((error) => {
    console.log(error);
    return error;
  });

  response.json(clients);
};

export async function getClient(request, response) {
  const results = await AppDataSource.getRepository(Client).findOneBy({
    id: request.params.id,
  }).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function addClient(request, response) {
  const client = await AppDataSource.getRepository(Client).create(request.body)
  const results = await AppDataSource.getRepository(Client).save(client).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}

export async function deleteClient(request, response) {
  const results = await AppDataSource.getRepository(Client).delete(request.params.id).catch((error) => {
    console.log(error);
    return error;
  });
  return response.send(results);
}