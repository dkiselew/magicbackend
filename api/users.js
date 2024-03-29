import prisma from '~/api/prisma';

export async function getUserByEmail(client, email) {
  return await prisma.users.findUnique(({
    where: {
      email
    },
    include: { projects: true }
  }));

  // const query = 'SELECT * FROM users WHERE email = $1';
  // const values = [email];
  // const result = await client.query(query, values);

  // if (result.rows.length > 0) {
  //   return result.rows[0];
  // } else {
  //   return null;
  // }
}

export async function getUserById(client, id) {
  // const query = 'SELECT * FROM users WHERE id = $1';
  // const values = [id];
  // const result = await client.query(query, values);

  // if (result.rows.length > 0) {
  //   return result.rows[0];
  // } else {
  //   return null;
  // }
  return await prisma.users.findUnique({
    where: {
      id
    },
    include: { projects: true }
  });
}