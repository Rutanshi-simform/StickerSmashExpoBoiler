/**
 *
 * @returns
 */
export const GET = () => {
  return Response.json({
    greeting: 'Hello, world!',
    MY_VALUE: process.env.MY_VALUE,
    EXPO_PUBLIC_VALUE: process.env.EXPO_PUBLIC_VALUE
  });
};

/**
 *
 * @param request
 * @returns
 */
export const POST = async (request: Request) => {
  const name = new URL(request.url).searchParams.get('name') || 'rutanshi';
  return Response.json({ greeting: `greetings for ${name}` });
};
