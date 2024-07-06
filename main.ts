#! /usr/bin/env node
// oop my bank
import inquirer from "inquirer";
import chalk from 'chalk'
console.log(chalk.bold.magenta("\n\t~~~~~~~~   Welcome To My Bank  ~~~~~~~~\n"));

// bank account interface

interface BankAccount {
  userAccountNumber: number;
  userBalance: number;
  withdraw(amount: number): void;
  deposit(amount: number): void;
  checkBalance(): void;
}

// bank Account Class

class BankAccount implements BankAccount {
  userAccountNumber: number;
  userBalance: number;
  constructor(userAccountNumber: number, userBalance: number) {
    this.userAccountNumber = userAccountNumber;
    this.userBalance = userBalance;
  }
  
  // withdraw

  withdraw(amount: number): void {
    if (this.userBalance >= amount) {
      this.userBalance -= amount;
      console.log(
        chalk.gray(`withrawal of $${amount},remaining balance: $${this.userBalance}`)
      );
    } else {
      console.log(chalk.underline.redBright("\n\t insufficient Balance \n "));
    }
  }
  // deposit 
  deposit(amount: number): void {
    if (amount > 100) {
      amount -= 1; // $1 fee charge if more than $100 is deposited
    }
    this.userBalance += amount;
    console.log(chalk.blackBright.bold(
      `Deposit of ${amount} successfully. Remaining balance: $${this.userBalance}`)
    );
  }
  // check balance
  checkBalance(): void {
    console.log( chalk.bold.whiteBright(`Current Balnce is $${this.userBalance}`));
  }
}
// customer class
class Customer {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  mobileNumber: number;
  account: BankAccount;

  constructor(
    firstName: string,
    lastName: string,
    gender: string,
    age: number,
    mobileNumber: number,
    account: BankAccount
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.gender = gender;
    this.age = age;
    this.mobileNumber = mobileNumber;
    this.account = account;
  }
}
// create bank accounts
const accounts: BankAccount[] = [
  new BankAccount(6002, 5000),
  new BankAccount(6004, 7000),
  new BankAccount(6006, 9000),
];
//  customer details
const customers: Customer[] = [
  new Customer("Ahsan", "khan", "male", 18, 3167823455, accounts[0]),
  new Customer("Younus", "John", "male", 25, 3442314578, accounts[1]),
  new Customer("Sadia", "Raheen", "Female", 22, 3331467832, accounts[2]),
];
// function to interect with bank account

async function bankService() {
  do {
    const accountNumberInput = await inquirer.prompt({
      name: "AccountNumber",
      type: "number",
      message: chalk.italic.cyan("Please enter your account Number:"),
    });
    const customer = customers.find(
      (customer) =>
        customer.account.userAccountNumber === accountNumberInput.AccountNumber
    );
    if (customer) {
      console.log( chalk.underline.bold.green(`\n Welcome, ${customer.firstName} ${customer.lastName}\n`));
      const ans = await inquirer.prompt([
        {
          name: "Select",
          type: "list",
          message: chalk.bold.cyan("Please select the service:\n"),
          choices: ["Deposit","Withdraw","Check Balance", "Exit"],
        },
      ]);

      switch (ans.Select) {
        case "Deposit":
          const depositAmout = await inquirer.prompt({
            name: "amount",
            type: "number",
            message: chalk.bold.whiteBright("Enter the amount to deposit:"),
          });
          customer.account.deposit(depositAmout.amount);
          break;
        case "Withdraw":
          const withdrawAmout = await inquirer.prompt({
            name: "amount",
            type: "number",
            message:chalk.whiteBright.italic( "Enter the amount to withdraw:"),
          });
          customer.account.withdraw(withdrawAmout.amount);
          break;
        case "Check Balance":
          customer.account.checkBalance();
          break;
        case "Exit":
          console.log(chalk.magenta("\n\t Exiting  bank program..\n"));
          console.log(chalk.red ("\n ***** Thank you for using our bank service. *****"));
          return;
      }
    } else {
      console.log(chalk.magentaBright("Invalid Account Number, Please try again. "));
    }
  } while (true);
}
bankService();
