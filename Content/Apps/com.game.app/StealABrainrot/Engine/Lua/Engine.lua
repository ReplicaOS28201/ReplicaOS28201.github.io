local brainrots = {}
local func = {}
local LP ={}
local server = {}

function server.validateEvent(server,localplayer, caller)
  if server then 
    if localplayer then
      local udo = localplayer
      local rex = udo + sr
      server:Call(udo,caller)
    else
      -- no lp
    end
  else
    -- no server
  end
end

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

  
