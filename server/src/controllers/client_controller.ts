import { AppDataSource } from "../data-source"
import { Client } from "../entity/Client";

export async function getAllClients(request, response) {
  const clients = await AppDataSource.getRepository(Client).find();

  response.json(clients)
};

export async function getClient(request, response) {
  const results = await AppDataSource.getRepository(Client).findOneBy({
    id: request.params.id,
  })
  return response.send(results)
}

// TODO: Test it
export async function addClient(request, response) {
  const client = await AppDataSource.getRepository(Client).create(request.body)
  const results = await AppDataSource.getRepository(Client).save(client)
  return response.send(results)
}