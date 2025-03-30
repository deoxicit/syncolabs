export async function runValidator({ data }) {
    const score = Math.floor(Math.random() * 100); // Mock score
    return {
      score,
      reasoning: `Evaluated using benchmark criteria. Score: ${score}`,
    };
  }
  