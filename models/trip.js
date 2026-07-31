import { Schema, model } from "mongoose";

const ExpenseSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

const BudgetSchema = new Schema({
    total: {
    type: Number,
    required: true,
  },
  spent: {
    type: Number,
    default: 0,
  },
  expenses: [ExpenseSchema],
});

const FileSchema = new Schema({
  url:{
    type: String,
    required: true,
  },
  publicId:{
    type: String,
    required: true,
  }

})

const TripSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  destinations: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  budget: BudgetSchema,
  collaborators: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  files: [FileSchema],

});

TripSchema.pre("findOneAndUpdate", function () {
 const update = this.getUpdate();
 const budgetUdate = update?.budget ?? update?.$set?.budget;
 const expenses = Array.isArray(budgetUdate?.expenses) ? budgetUdate.expenses : undefined;

if(!expenses?.length) return;

budgetUdate.spent = Number(budgetUdate.spent ?? 0) + expenses.reduce((acc, expense) => acc + Number(expense.amount ?? 0), 0);

expenses.forEach((expense) => {
  if (expense && typeof expense === "object") {
    expense.date = expense.date ? new Date(expense.date) : new Date();
  }
});

});

const Trip = model("Trip", TripSchema);

export default Trip;