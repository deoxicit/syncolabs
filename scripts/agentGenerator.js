export async function runGenerator(prompt) {
    return {
      data: `Synthetic data generated from: "${prompt}"`,
      cot: `Generated using rules A, B, C based on input: "${prompt}"`,
    };
  }
  