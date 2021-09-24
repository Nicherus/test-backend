export default new class ServicesController {

	bracketsTesting = async (inputBrackets: any) : Promise<Boolean> => {

		// reference string for comparison
		const brackets = "[]{}()";
		let stack = [];

		for(let bracket of inputBrackets){
			const bracketsIndex = brackets.indexOf(bracket);

			// check if the current character is a bracket or not
			if(bracketsIndex === -1){
				continue;
			}

			// check if the current bracket is an opening or closing bracket
			if(bracketsIndex % 2 === 0){
				// if the current bracket is an opening one, save the respective closing one for later reference
				stack.push(bracketsIndex + 1);
			} else {
				// if the current bracket is a closing one and does not match the last reference breaks the loop and returns false because there is no matching brackets
				if(stack.pop() !== bracketsIndex){
					return false;
				}
			}
		}

		return stack.length === 0;
	}
};