local brainrots = {}
local func = {}
local LP ={}
function func.BuyBrainrot(uuid, user)
  if user then 
    if uuid then
      function func.getUserMoney(loc,user)
        if user then if loc then LP.RemoveMoneyFrom(user, loc) end
        end
      end
     if success,error then  brainrots.get(uuid,bringtobase) else warn(error) end
      
    else
      -- no uuid
    end
  else
    -- no user
  end
end

  
