

export const useEsa = () => {
  const getAchievement = async (access_token: string, team_name: string) => {
    console.log(access_token);
    console.log(team_name);
    const data = await fetch(`https://api.esa.io/v1/teams/${team_name}/members`, {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return await data.json();
  }
  return { getAchievement };
}
