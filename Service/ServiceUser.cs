﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository;
using Entite;
using Zxcvbn;
using Microsoft.Extensions.Logging;


namespace Service
{
    public class ServiceUser : IServiceUser

    {
        private readonly ILogger<ServiceUser> _logger;

        IRepositoryUser repository;
        public ServiceUser(IRepositoryUser _repositoryUser, ILogger<ServiceUser> logger)
        {
            _logger = logger;
            repository = _repositoryUser;
        }

 
        public async Task<User> GetUserById(int id)
        {
            return await repository.GetUserById(id);

        }

        public async Task<User> AddUser(User user)
        {
            int passwordStrength = CheckPassword(user.Password);
            if (passwordStrength >= 2)
                return await repository.AddUser(user);
            else
                return null;
        }
        public async Task<User> Login(string UserName, string Password)
        {
            return  await repository.Login(UserName, Password);
        }

        public async Task UpdateUser(int id, User value)
        {
            if(CheckPassword(value.Password) >= 2)
                throw new Exception("Password is not strong enough");
           await repository.UpdateUser(id, value);
        }
        public int CheckPassword(string password)
        {
            var result = Zxcvbn.Core.EvaluatePassword(password);
            return result.Score;
        }

    }
}
