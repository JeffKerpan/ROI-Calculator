(function() {
  'use strict';

  angular.module("app")
  .component('app', {
    controller: controller,
    templateUrl: 'app/app.template.html'
  })

  function controller() {
    const vm = this;

    vm.$onInit = onInit;
    vm.addItem = addItem;
    vm.deleteItem = deleteItem;

    vm.sumTotal = sumTotal;
    vm.total = total;

    vm.monthlyContribution = monthlyContribution;
    vm.contriubtionProfit = contriubtionProfit;
    vm.contributionMargin = contributionMargin;
    vm.capitalRoi = capitalRoi;

    vm.newItemsIncome = {};
    vm.newItemsExpenses = {};

    function onInit() {
      vm.itemsIncome = [
        {
          name: 'Item 1',
          once: 100,
          monthly: 50,
        },
        {
          name: 'Item 2',
          once: 50,
          monthly: 25,
        },
        {
          name: 'Item 3',
          once: 25,
          monthly: 85
        }
      ]

      vm.itemsExpenses = [
        {
          name: 'Expense 1',
          once: 500,
          monthly: 85,
        },
        {
          name: 'Expense 2',
          once: 200,
          monthly: 40
        }
      ]

      calculateData();
    }

    addItem(array, newItem) => {
      if (newItem === vm.newItemsIncome) {
        vm.itemsIncome.push(vm.newItemsIncome);
      } else if (newItem === vm.newItemsExpenses) {
        vm.itemsExpenses.push(vm.newItemsExpenses);
      }
      delete vm.newItemsIncome;
      delete vm.newItemsExpenses;
      calculateData();
    }

    deleteItem(array, item) => {
      var result = 0;
      for(let i=0; i<array.length, i++) {
        if (array[i].name === item.name) {
          result = i;
        }
      }
      array.splice(result,1);
      calculateData();
    }

    sumTotal(array, times) => {
      var result = 0;
      for(let i=0; i<array.length; i++) {
        result += array[i][times];
      }
      return result;
    }

    total(num, num2) => {
      return num + (num2 * 12);
    }

    monthlyContribution() => return vm.monthlyIncome - vm.monthlyExpenses;

    contriubtionProfit() => return vm.totalRevenue -vm.totalExpenses;

    contributionMargin() => {
      if (vm.totalRevenue == 0) {
        return 0;
      }
        return (vm.totalContributionProfit/vm.totalRevenue *100).toFixed(0);
    }

    capitalRoi() => {
      if (vm.monthlyContributionProfit == 0) {
        return 0;
      }
        return ((vm.onceSumExpenses - vm.onceSumIncome) / vm.monthlyContributionProfit).toFixed(1);
    }

    calculateData() => {
      vm.onceSumIncome = vm.sumTotal(vm.itemsIncome, 'once');
      vm.monthlyIncome = vm.sumTotal(vm.itemsIncome, 'monthly');
      vm.totalRevenue = vm.total(vm.onceSumIncome, vm.monthlyIncome);

      vm.onceSumExpenses = vm.sumTotal(vm.itemsExpenses, 'once');
      vm.monthlyExpenses = vm.sumTotal(vm.itemsExpenses, 'monthly');
      vm.totalExpenses = vm.total(vm.onceSumExpenses, vm.monthlyExpenses);

      vm.monthlyContributionProfit = vm.monthlyContribution();
      vm.totalContributionProfit = vm.contriubtionProfit();
      vm.totalContributionMargin = vm.contributionMargin();
      vm.totalCapitalRoi = vm.capitalRoi;
    }


  }

})();
